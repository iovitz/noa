import { commonRequest } from '@/utils/request/request'

export const rSearchUser = (contains: string) =>
  commonRequest.post<
    {
      userid: string
      nickname: string
      avatar: ''
    }[]
  >(`/user/search`, {
    contains,
  })

export const rGetUserInfo = (userid: string) =>
  commonRequest.get<{
    userid: string
    avatar?: string
    nickname: string
    profile: {
      gender?: number
      birth?: number
      desc?: string
    }
  }>(`/user/u/${userid}`)
