import { commonRequest } from "@/utils/request/request";

export const rFriendRequest = (friendId, reason) =>
	commonRequest.post(`/apply/friend`, {
		friend_id: friendId,
		reason,
	});

export const rGetFriendApplyList = () => commonRequest.get(`/apply/friend`);

export const rPassFriendApply = (friendUserId) =>
	commonRequest.post(`/apply/friend/pass`, {
		from: friendUserId,
	});
