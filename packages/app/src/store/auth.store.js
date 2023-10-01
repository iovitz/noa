import { rLogin, rRegister, rTestAuth } from "@/io/http/auth";
import { longChain } from "@/io/ws/ws";
import logger from "@/utils/logger";
import { storage } from "@/utils/storage";
import { defineStore } from "pinia";
import { useUserStore } from "./user.store";
import { useChatStore } from "./chat.store";

export const useAuthStore = defineStore("auth", {
	persist: {
		key: "auth",
		paths: ["nickname", "avatar", "username", "userid"],
	},
	state: () => {
		return {
			username: "",
			nickname: "",
			avatar: "",
			userid: "",
		};
	},
	actions: {
		async init(userid) {
			userid = userid ?? this.userid;
			longChain.connect();
			if (window) {
				window.userid = userid;
			}
			const chatStore = useChatStore();
			const userStore = useUserStore();
			chatStore.init(userid);
			await userStore.fetchFriendsList();
		},
		async login(username, password) {
			const { code, data } = await rLogin(username, password);
			if (code === 0) {
				uni.showToast({
					title: "登录成功，正在跳转",
					duration: 1000,
					icon: "success",
				});
				this.$patch({
					username: data.username,
					nickname: data.nickname,
					avatar: data.avatar,
					userid: data.userid,
				});
				await this.init(data.userid);
				logger.verbose("登录成功", data);
				storage.syncSet("session", data.session);
				setTimeout(() => {
					uni.switchTab({
						url: "/pages/message/message",
					});
				}, 1000);
			}
		},

		async register(nickname, username, password) {
			const { code, data } = await rRegister(nickname, username, password);
			if (code === 0) {
				uni.showToast({
					title: "注册成功，即将自动登录",
					duration: 2000,
					icon: "success",
				});
				this.$patch({
					username: data.username,
					nickname: data.nickname,
					avatar: data.avatar,
					userid: data.userid,
				});
				logger.verbose("注册成功", data);
				storage.syncSet("session", data.session);
				await this.init(data.userid);
				setTimeout(() => {
					uni.switchTab({
						url: "/pages/message/message",
					});
				}, 1000);
			}
		},
	},
});
