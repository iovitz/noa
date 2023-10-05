import { rLogin, rRegister, rTestAuth } from "@/io/http/auth";
import { longChain } from "@/io/ws/ws";
import logger from "@/utils/logger";
import { storage } from "@/utils/storage";
import { defineStore } from "pinia";
import { useUserStore } from "./user.store";
import { useChatStore } from "./chat.store";
import { rPutUserInfo } from "@/io/http/user";

export const useAuthStore = defineStore("auth", {
	persist: {
		key: "auth",
		paths: ["nickname", "avatar", "userid", "desc"],
	},
	state: () => {
		return {
			nickname: "",
			avatar: "",
			desc: "",
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
			const data = await rLogin(username, password);
			uni.showToast({
				title: "登录成功，正在跳转",
				duration: 1000,
				icon: "success",
			});
			this.$patch(data);
			logger.verbose("登录成功", data);
			storage.syncSet("session", data.session);
			await this.init(data.userid);
			setTimeout(() => {
				uni.switchTab({
					url: "/pages/message/message",
				});
			}, 1000);
		},

		async register(nickname, username, password) {
			const data = await rRegister(nickname, username, password);
			uni.showToast({
				title: "注册成功，即将自动登录",
				duration: 2000,
				icon: "success",
			});
			this.$patch(data);
			logger.verbose("注册成功", data);
			storage.syncSet("session", data.session);
			await this.init(data.userid);
			setTimeout(() => {
				uni.switchTab({
					url: "/pages/message/message",
				});
			}, 1000);
		},

		async updateUserInfo(userinfo) {
			// 更新用户头像
			const data = await rPutUserInfo(this.userid, userinfo);
			this.$patch(data);
		},
	},
});
