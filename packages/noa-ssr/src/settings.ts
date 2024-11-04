import { homedir } from 'node:os'
import path from 'node:path'

export const settings = {
  sqliteUrl: path.join(homedir(), 'sqlite/noa.db'),
}
