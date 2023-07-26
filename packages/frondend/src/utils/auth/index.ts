import { storage } from '../storage/storage'

export function isLoggedIn() {
  return Boolean(storage.get('session'))
}
