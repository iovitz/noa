import { logger as formEditorLogger } from 'noa-form-editor'
import { env } from '../config/config'

formEditorLogger.setLevel(env.logLevel)

export const logger = formEditorLogger
