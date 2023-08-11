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
