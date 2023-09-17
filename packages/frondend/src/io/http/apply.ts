import { commonRequest } from '@/utils/request/request'

export const rFriendRequest = (friendId: string, reason: string) =>
  commonRequest.post<any>(`/apply/friend`, {
    friend_id: friendId,
    reason,
  })

export const rGetFriendApplyList = () => commonRequest.get<any>(`/apply/friend`)

export const rPassFriendApply = (friendUserId: string) =>
  commonRequest.post<any>(`/apply/friend/pass`, {
    from: friendUserId,
  })
