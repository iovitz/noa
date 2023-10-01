import { rFetchFriendList, rGetUserInfo } from "@/io/http/user";
import logger from "@/utils/logger";
import Identicon from "identicon.js";
import { defineStore } from "pinia";
import MD5 from "md5.js";

const fetchingUserIds = new Set();

export const useUserStore = defineStore("user", {
	persist: {
		key: "user",
		paths: ["userinfo"],
	},
	state: () => {
		return {
			friends: [],
			userinfo: {},
		};
	},
	actions: {
		async fetchUserInfo(useridList, force = false) {
			const { userinfo } = this;
			// 过滤掉已经拉取过的
			if (!force) {
				useridList = useridList.filter((uid) => {
					if (userinfo[uid]) {
						return false;
					} else {
						return true;
					}
				});
			}
			// 过滤掉正在拉取的
			useridList = useridList.filter((id) => {
				if (fetchingUserIds.has(id)) {
					return false;
				} else {
					fetchingUserIds.add(id);
					return true;
				}
			});
			// 加入fetching队列
			const { data } = await rGetUserInfo(useridList);
			console.log(data);
			useridList.forEach((id) => {
				const info = data[id];
				// 没有头像时使用默认头像(性能问题)
				if (!info.avatar) {
					info.avatar =
						"data:image/png;base64," +
						new Identicon(new MD5().update(id).digest("hex"), 420).toString();
				}
				fetchingUserIds.delete(id);
			});
			this.$patch({
				userinfo: {
					...userinfo,
					...data,
				},
			});
		},
		async fetchFriendsList() {
			uni.showLoading({
				title: "正在加载用户数据",
				mask: true,
			});
			const res = await rFetchFriendList();

			this.$patch({
				friends: res.data,
			});
			setTimeout(uni.hideLoading, 500);
		},
		async getUserNameById(targetid) {
			return this.userinfo[targetid].nickname;
		},
	},
});
