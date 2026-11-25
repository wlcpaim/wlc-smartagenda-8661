import { TelegramSettings, Appointment } from '../types';

const STORAGE_KEY = 'smartagenda_telegram';

export const getTelegramSettings = (): TelegramSettings => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    return { token: '', chatId: '', enabled: false };
  }
  try {
    return JSON.parse(data);
  } catch {
    return { token: '', chatId: '', enabled: false };
  }
};

export const saveTelegramSettings = (settings: TelegramSettings): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
};

export const sendTelegramMessage = async (token: string, chatId: string, text: string): Promise<boolean> => {
  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown'
      })
    });
    return res.ok;
  } catch (err) {
    console.error('[Telegram] Erro ao enviar mensagem:', err);
    return false;
  }
};

export const sendTelegramNotification = async (appointment: Appointment, serviceName: string, barberName: string): Promise<boolean> => {
  const settings = getTelegramSettings();
  if (!settings.enabled || !settings.token || !settings.chatId) {
    console.log('[Telegram Mock] Notificações desativadas ou incompletas.');
    return false;
  }

  const message = `🔔 *Novo Agendamento SmartAgenda*\n\n` +
    `👤 Cliente: ${appointment.clientName} (${appointment.clientPhone})\n` +
    `✂️ Serviço: ${serviceName}\n` +
    `💈 Barbeiro: ${barberName}\n` +
    `📅 Data: ${appointment.date} às ${appointment.time}\n` +
    `💰 Valor: R$ ${appointment.totalPrice.toFixed(2)}`;

  return await sendTelegramMessage(settings.token, settings.chatId, message);
};