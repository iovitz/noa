import { commonRequest } from "@/utils/request/request";

export const rSearchUser = (contains) =>
	commonRequest.post(`/user/search`, {
		contains,
	});

export const rGetUserInfo = (userids, profile = false, isFriend = false) =>
	commonRequest.post(`/user/info`, {
		userids,
		profile,
		isFriend,
	});

export const rFetchFriendList = () => commonRequest.get("/user/friends");

export const rPutUserInfo = (userid, userinfo) =>
	commonRequest.put(`/user/info/${userid}`, userinfo);
