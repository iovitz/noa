import { commonRequest } from '@/utils/request/request'

export const rFindUser = (contains: string) =>
  commonRequest.post<
    {
      userid: string
      nickname: string
      avatar: ''
    }[]
  >(`/user/find`, {
    contains,
  })
