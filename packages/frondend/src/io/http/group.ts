import { commonRequest } from '@/utils/request/request'

export const rCreateGroup = (name: string, avatar: string) =>
  commonRequest.post<any>(`/group/create`, {
    name,
    avatar,
  })

export const rSearchGroup = (contains: string) =>
  commonRequest.post<
    {
      groupid: string
      name: string
      avatar: ''
    }[]
  >(`/group/search`, {
    contains,
  })
