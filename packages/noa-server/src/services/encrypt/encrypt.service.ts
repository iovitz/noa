import { Buffer } from 'node:buffer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { compare, genSalt, hash } from 'bcrypt'
import { AES } from 'crypto-js'
import { gzip, ungzip } from 'pako'
import { stringify } from 'safe-stable-stringify'

@Injectable()
export class EncryptService {
  constructor(private configService: ConfigService) {}

  ungzip(gzipBase64Str) {
    return JSON.parse(
      ungzip(Buffer.from(gzipBase64Str, 'base64'), { to: 'string' }),
    )
  }

  gzip(data) {
    return this.strToGzipBase64(stringify(data))
  }

  strToGzipBase64(str) {
    return Buffer.from(gzip(str, { level: 9 })).toString('base64')
  }

  comparePassword(password, hash) {
    return compare(password, hash)
  }

  async encryptPassword(password) {
    const salt = await genSalt(10)
    const pass = hash(password, salt)
    return pass
  }

  aesEncrypt(message) {
    return AES.encrypt(
      message,
      this.configService.getOrThrow('AES_ENCRYPT_KEY'),
    ).toString()
  }

  aesDecrypt(encrypted) {
    return AES.decrypt(
      encrypted,
      this.configService.getOrThrow('AES_ENCRYPT_KEY'),
    ).toString(CryptoJS.enc.Utf8)
  }
}
