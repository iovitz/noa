import { IOClient } from 'noa-form-editor'

export interface ServerData<T> {
  code: number
  data: T
  message: string
}

export const ioClient = new IOClient({
  baseURL: '/api-noa',
  timeout: 20000,
  socketPath: '/api-noa/ws',
})
