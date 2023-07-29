import { storage } from './storage'

export function getSession() {
  return storage.get<string>('session')
}
