import { rFetchCurrentUserinfo, rGetUserInfo } from "@/io/http/user";
import logger from "@/utils/logger";
import { defineStore } from "pinia";

const fetchingUserIds = new Set();

export const useUserStore = defineStore("user", {
	persist: {
		key: "user",
		paths: ["userinfo"],
	},
	state: () => {
		return {
			friends: [],
			userinfo: {
				zs: {
					nickname: "张三",
					age: 18,
				},
			},
		};
	},
	actions: {
		async fetchUserInfo(useridList, profile = false, force = false) {
			const { userinfo } = this;
			// 过滤掉已经拉取过的UserID
			if (!force) {
				useridList = useridList.filter((uid) => {
					if (userinfo[uid] || fetchingUserIds.has(uid)) {
						return false;
					} else {
						fetchingUserIds.add(uid);
						return true;
					}
				});
			}
			// 加入fetching队列
			const { data } = await rGetUserInfo(useridList, profile);
			useridList.forEach((id) => fetchingUserIds.delete(id));
			this.$patch({
				userinfo: {
					...userinfo,
					...data,
				},
			});
		},
		async fetchCurrentUserinfo() {
			uni.showLoading({
				title: "正在加载用户数据",
				mask: true,
			});
			const res = await rFetchCurrentUserinfo();
			this.$patch({
				friends: res.data.friends.map((friend) => friend.friend.userid),
			});
			setTimeout(uni.hideLoading, 500);
		},
	},
});
