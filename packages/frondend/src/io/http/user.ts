import { commonRequest } from '@/utils/request/request'

export const rLogin = (username: string, password: string) =>
  commonRequest.post<any>(`/user/login`, {
    username,
    password,
  })

export const rRegister = (nickname: string, username: string, password: string) =>
  commonRequest.post<any>(`/user/register`, {
    nickname,
    username,
    password,
  })

export const rFind = (content: string) =>
  commonRequest.post<any>(`/user/find`, {
    content,
  })
