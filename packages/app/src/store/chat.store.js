import { defineStore } from "pinia";
import { storage } from "@/utils/storage";
import { v4 as uuidv4 } from "uuid";
import { find } from "lodash";
import { longChain } from "@/io/ws/ws";
import logger from "@/utils/logger";

export const useChatStore = defineStore("chat", {
	persist: {
		key: "chat",
		paths: ["appointList", "chatList"],
	},
	state: () => {
		return {
			ready: false,
			loginUser: null,
			currentChatId: null,
			appointList: [],
			chatList: [],
			currentChatMessages: [],
		};
	},
	actions: {
		handleNewMessage(payload) {
			const { from, type, content } = payload;
			logger.verbose("收到新消息", from, type, content);
			const key = this.getMessageKey(from);
			const messages =
				this.currentChatId === from
					? this.currentChatMessages
					: this.getMessages(from);

			this.chatTriggered(from, content, true);
			switch (type) {
				case "text": {
					messages.unshift({
						content,
						type: "text",
						timestamp: Date.now(),
					});
					storage.syncSet(key, messages);
					break;
				}
			}
		},
		init(userid) {
			if (this.ready) return;
			this.loginUser = userid;
			longChain.on("NEW_MESSAGE", this.handleNewMessage);
			this.ready = true;
		},

		chatTriggered(targetid, content, receive = false) {
			const findedItem = find(this.chatList, {
				targetid,
			}) || {
				targetid,
			};
			findedItem.message = content;
			findedItem.timestamp = Date.now();
			// 接收消息需要统计未读
			if (receive) {
				if (targetid === this.currentChatId) {
					findedItem.notRead = 0;
				} else {
					findedItem.notRead = findedItem.notRead ? findedItem.notRead + 1 : 1;
				}
			}
			// 添加item
			this.$patch({
				chatList: [
					findedItem,
					...this.chatList.filter(
						({ targetid: itemid }) => itemid !== targetid,
					),
				],
			});
		},

		setAppoint(targetid) {
			this.appointList.push(targetid);
		},

		handleChatStart(targetid) {
			this.currentChatId = targetid;
			const messages = this.getMessages(targetid);
			this.$patch({
				currentChatMessages: messages,
			});
			const chatItem = find(this.chatList, {
				targetid,
			});
			if (chatItem) {
				chatItem.notRead = 0;
			}
		},

		handleChatEnd() {
			this.currentChatId = null;
			this.$patch({
				currentChatMessages: [],
			});
		},

		getMessageKey(targetid) {
			const { loginUser } = this;
			if (!loginUser) {
				throw new Error("Need Initionize!");
			}
			return `chat_message-${loginUser}-${targetid}`;
		},

		async handleTextMessage(targetid, content) {
			const storeKey = this.getMessageKey(targetid);
			this.chatTriggered(targetid, content);
			const messageBody = {
				content,
				type: "text",
				timestamp: Date.now(),
				targetid,
			};
			this.sendMessage(messageBody);
			this.currentChatMessages.unshift(messageBody);
			storage.syncSet(storeKey, this.currentChatMessages);
		},

		storeMessage(targetid, content) {
			const messageBody = {
				targetid: targetid,
				content,
				type: "text",
				timestamp: Date.now(),
				signature: uuidv4,
			};
			this.currentChatMessages.unshift(messageBody);
			return messageBody;
		},

		getMessages(targetid) {
			const key = this.getMessageKey(targetid);
			try {
				return storage.getObj(key) ?? [];
			} catch (e) {
				storage.remove(key);
				return [];
			}
		},
		sendMessage(messageBody) {
			// 发送socket消息
			longChain.emit("NEW_MESSAGE", messageBody);
		},
		delectFromChatList(targetid) {
			this.$patch({
				chatList: this.chatList.filter((item) => item.targetid !== targetid),
			});
		},
	},
});
