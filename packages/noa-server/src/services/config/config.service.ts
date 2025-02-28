import { Injectable } from '@nestjs/common'
import { Config } from 'src/shared/config'

@Injectable()
export class ConfigService extends Config {
}
