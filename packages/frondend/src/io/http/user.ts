import { commonRequest } from '@/utils/request/request'

export const rLogin = (username: string, password: string) =>
  commonRequest.post<{
    avatar: string | null
    nickname: string
    session: string
    userid: string
    username: string
  }>(`/user/login`, {
    username,
    password,
  })

export const rRegister = (nickname: string, username: string, password: string) =>
  commonRequest.post<{
    avatar: string | null
    nickname: string
    session: string
    userid: string
    username: string
  }>(`/user/register`, {
    nickname,
    username,
    password,
  })

export const rFind = (content: string) =>
  commonRequest.post<any>(`/user/find`, {
    content,
  })
