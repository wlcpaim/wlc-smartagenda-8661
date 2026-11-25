import React, { useState } from 'react';
import { TelegramSettings } from '../../types';
import { getTelegramSettings, saveTelegramSettings } from '../../services/storage';
import { sendTelegramMessage } from '../../services/telegram';
import { Send, CheckCircle2, AlertCircle, Shield, Bell } from 'lucide-react';

export default function SettingsView() {
  const [settings, setSettings] = useState<TelegramSettings>(getTelegramSettings());
  const [testStatus, setTestStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    saveTelegramSettings(settings);
    setTimeout(() => {
      setIsSaving(false);
      alert('Configurações salvas com sucesso!');
    }, 500);
  };

  const handleTest = async () => {
    setTestStatus('idle');
    setTestMessage('');
    if (!settings.token || !settings.chatId) {
      setTestStatus('error');
      setTestMessage('Preencha o Token e o Chat ID antes de testar.');
      return;
    }

    try {
      const success = await sendTelegramMessage(
        settings,
        '🚨 *Teste SmartAgenda*\n\nA integração com o Telegram está funcionando perfeitamente!'
      );
      if (success) {
        setTestStatus('success');
        setTestMessage('Mensagem de teste enviada com sucesso!');
      } else {
        setTestStatus('error');
        setTestMessage('Falha ao enviar. Verifique o token e chat ID.');
      }
    } catch (err: any) {
      setTestStatus('error');
      setTestMessage(err.message || 'Erro ao conectar com a API do Telegram.');
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold text-white">Configurações do Sistema</h2>
        <p className="text-sm text-zinc-400">Gerencie integrações de notificações e avisos automáticos.</p>
      </div>

      <form onSubmit={handleSave} className="bg-[#121216] border border-zinc-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-zinc-800">
          <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Integração Telegram Bot</h3>
            <p className="text-xs text-zinc-400">Receba alertas instantâneos de novos agendamentos e walk-ins.</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
          <div>
            <span className="font-medium text-white text-sm">Ativar Notificações Telegram</span>
            <p className="text-xs text-zinc-400">Disparar mensagens automáticas para o chat configurado</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.enabled}
              onChange={(e) => setSettings({ ...settings, enabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
          </label>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">Telegram Bot Token</label>
            <input
              type="text"
              placeholder="Ex: 123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ"
              value={settings.token}
              onChange={(e) => setSettings({ ...settings, token: e.target.value })}
              className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white text-sm focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">Chat ID (Usuário ou Canal)</label>
            <input
              type="text"
              placeholder="Ex: -1001234567890 ou 987654321"
              value={settings.chatId}
              onChange={(e) => setSettings({ ...settings, chatId: e.target.value })}
              className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white text-sm focus:outline-none focus:border-red-500"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-800">
          <button
            type="button"
            onClick={handleTest}
            className="w-full sm:w-auto px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4 text-blue-400" />
            <span>Testar Conexão</span>
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full sm:w-auto px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-red-600/20"
          >
            {isSaving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>

        {testStatus === 'success' && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{testMessage}</span>
          </div>
        )}

        {testStatus === 'error' && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{testMessage}</span>
          </div>
        )}
      </form>
    </div>
  );
}
