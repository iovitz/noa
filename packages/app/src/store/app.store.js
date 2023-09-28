import { defineStore } from "pinia";
import { storage } from "@/utils/storage";

export const useAppStore = defineStore("app", {
	persist: {
		key: "app",
		paths: [],
	},
	state: () => {
		return {
			launchPageShow: false,
		};
	},
	actions: {},
});
