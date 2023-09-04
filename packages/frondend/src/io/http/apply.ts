import { commonRequest } from '@/utils/request/request'

export const rFriendRequest = (friendId: string, reason: string) =>
  commonRequest.post<any>(`/apply/friend`, {
    friend_id: friendId,
    reason,
  })
