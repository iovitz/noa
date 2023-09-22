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

export const rGetUserInfo = (userids: string[], profile = false) =>
  commonRequest.post<
    Record<
      string,
      {
        nickname: string
        avatar?: string
        profile?: {
          birth?: string
          desc?: string
          gender?: string
        }
      }
    >
  >(`/user/info`, {
    userids,
    profile,
  })

export const rFetchCurrentUserinfo = () => commonRequest.get<any>('/user/fullinfo')
