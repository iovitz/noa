import { commonRequest } from "@/utils/request/request";

export const rSearchUser = (contains) =>
	commonRequest.post(`/user/search`, {
		contains,
	});

export const rGetUserInfo = (userids, profile = false) =>
	commonRequest.post(`/user/info`, {
		userids,
		profile,
	});

export const rFetchCurrentUserinfo = () => commonRequest.get("/user/fullinfo");
