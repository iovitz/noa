import { defineStore } from "pinia";

export const useMomentStore = defineStore("app", {
	persist: {
		key: "moment",
		paths: [],
	},
	state: () => {
		return {
			momentList: [],
		};
	},
	actions: {
		add(item) {
			this.momentList.unshift(item);
		},
	},
});
