import rc from 'rc'

const AppName = process.env.npm_package_name ?? 'nestapp'

const defaultConfig = {
  APP_PORT: process.env.PORT ?? 19001,

  ENCRYPT_AES_ENCRYPT_KEY: '9QkRaZ',

  REDIS_HOST: '127.0.0.1',
  REDIS_PASS: '123123',

  SWAGGER_ENABLE: false,

  BIZ_WIDGET_MAX_NUMBER: 250,

  LOG_LEVEL: 'info',
  // 是否启用压缩
  LOG_ZIPPED_ARCHIVE: true,
  LOG_MAX_SIZE: '30M',
  LOG_MAX_FILES: '3d',
  LOG_CONSOLE_LOGGING: true,
  LOG_DATA_PATTERN: 'DD-MM-YYYY',

  GITHUB_CLIENT_ID: '',
  GITHUB_CLIENT_SECRET: '',
}

type ConfigType = typeof defaultConfig

export const RcConfig: ConfigType = rc(AppName, defaultConfig)

export class Config {
  get<T extends keyof ConfigType>(key: T): ConfigType[T] {
    return RcConfig[key]
  }
}

export const config = new Config()
