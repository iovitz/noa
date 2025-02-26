import { Injectable } from '@nestjs/common'
import * as config from 'config'
import { isNil } from 'lodash'
import { Tracer } from '../tracer/tracer.service'

@Injectable()
export class ConfigService {
  private tracer = new Tracer()

  get<T extends keyof ConfigType>(key: T, defaultValue?: ConfigType[T]): ConfigType[T] {
    try {
      return config.get(key as string)
    }
    catch (e) {
      this.tracer.log(`ConfigService.get: key=${key as string}, defaultValue=${defaultValue}, error=${e}`)
      return defaultValue
    }
  }

  getOrThrow<T extends keyof ConfigType>(key: T): ConfigType[T] {
    return config.get(key as string)
  }
}
