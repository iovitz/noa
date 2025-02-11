import { IOClient } from 'noa-form-editor'

export { type ServerData } from 'noa-form-editor'

export const ioClient = new IOClient({
  baseURL: '/api-noa',
  timeout: 20000,
  socketPath: '/api-noa/ws',
})
