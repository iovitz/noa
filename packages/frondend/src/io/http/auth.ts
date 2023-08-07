import { commonRequest } from '@/utils/request/request'

export const rLogin = (username: string, password: string) =>
  commonRequest.post<{
    avatar: string | null
    nickname: string
    session: string
    userid: string
    username: string
  }>(`/auth/login`, {
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
  }>(`/auth/register`, {
    nickname,
    username,
    password,
  })

export const rLogout = (session: string) =>
  commonRequest.delete<any>(`/auth/logout`, {
    session,
  })
