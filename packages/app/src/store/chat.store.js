import { defineStore } from "pinia";
import { storage } from "@/utils/storage";

export const useChatStore = defineStore("chat", {
	persist: {
		key: "chat",
		paths: ["appointList", "chatList"],
	},
	state: () => {
		return {
			currentUser: null,
			appointList: [],
			chatList: [],
		};
	},
	actions: {
		init(userid) {
			this.currentUser = userid;
		},

		setAppoint(chatId) {
			this.appointList.push(chatId);
		},

		getMessageKey(chatid) {
			const { currentUser } = this;
			if (!currentUser) {
				throw new Error("Need Initionize!");
			}
			const key = `chat_message-${currentUser}-${chatid}`;
		},

		async sendMessage(chatid, content) {
			let messages;
			try {
				messages = storage.getObj(this.getMessageKey(chatid)) ?? [];
				messages.push(content);
				storage.setSync(key, messages);
			} catch (e) {
				mesages = [];
			} finally {
				messages.push(content);
				storage.setSync(key, messages);
			}
		},

		getMessages(chatid) {
			const key = this.getMessageKey(chatid);
			try {
				return storage.getObj(key) ?? [];
			} catch (e) {
				storage.remove(key);
				return [];
			}
		},
	},
});
