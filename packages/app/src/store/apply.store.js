import { rGetFriendApplyList, rPassFriendApply } from "@/io/http/apply";
import { longChain } from "@/io/ws/ws";
import { defineStore } from "pinia";

export const useApplyStore = defineStore("apply", {
	persist: {
		key: "apply",
		paths: [],
	},
	state: () => {
		return {
			applyList: [],
		};
	},
	actions: {
		newApply(data) {
			const list = this.applyList.filter((apply) => apply.from !== data.from);
			this.applyList = [
				{
					read: false,
					reason: data.reason,
					from: data.from,
					pass: false,
				},
				...list,
			];
		},

		requestApplyList() {
			rGetFriendApplyList().then((res) => {
				this.applyList = res.data;
			});
		},

		async passApply(from, idx) {
			this.applyList[idx].pass = true;
			const res = await rPassFriendApply(from);
			if (res.code !== 0) {
				this.applyList[idx].pass = false;
			}
		},

		bindEvent() {
			longChain.on("NewFriendApply", this.newApply);
		},
		unbindEvent() {
			longChain.off("NewFriendApply", this.newApply);
		},
	},
});
