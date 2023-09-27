import { commonRequest } from "@/utils/request/request";

export const rCreateGroup = (name, avatar) =>
	commonRequest.post(`/group/create`, {
		name,
		avatar,
	});

export const rSearchGroup = (contains) =>
	commonRequest.post(`/group/search`, {
		contains,
	});
