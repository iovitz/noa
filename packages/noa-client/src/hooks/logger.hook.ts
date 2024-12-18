import { logger } from '@/shared/logger/logger'

export function useLogger(scope?: string) {
  if (scope) {
    return logger.getLogger(scope)
  }
  return logger
}
