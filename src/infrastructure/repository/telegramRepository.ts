import { SendNotification } from "../../domain/repositories/sendNotification";
import { Content } from "../../domain/entities/content";
import axios from "axios";
import { envs } from "../../config/envs";

export class TelegramRepository extends SendNotification {
  async getChatID(): Promise<string> {
    // Get chat ID from telegram
    const response = await axios.get(
      `https://api.telegram.org/bot${envs.telegramToken}/getUpdates`
    );

    if (response.data.ok) {
      const updates = response.data.result;

      if (updates.length > 0) {
        const chatId = updates.at(-1).message.chat.id;

        return updates.at(-1).message.text === "/start" ?  chatId : "";
      } else {
        return "";
      }
    } else {
      return "";
    }
  }
  catch(error: Error | any) {
    console.error("Error:", error.response?.data || error.message);
    return "";
  }

  async sendNotification(content: Content): Promise<void> {
    const chatId = await this.getChatID();

    if (!chatId) {
      return;
    }

    const url = `https://api.telegram.org/bot${envs.telegramToken}/sendMessage`;

    const body = {
      chat_id: chatId,
      text: content.body,
    };

    try {
      const response = await axios.post(url, {...body, parse_mode: 'Markdown'});

      if (!response.data.ok) {
        console.error("Error sending message:", response.data);
      }
    } catch (error: Error | any) {
      console.error("Error sending message:", error.response?.data || error.message);
    }

  }
}
