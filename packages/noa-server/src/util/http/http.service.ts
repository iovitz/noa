import { Injectable } from '@nestjs/common'
import { UAParser } from 'ua-parser-js'

@Injectable()
export class HttpService {
  private uaParser = new UAParser()

  getUAParser(ua: string) {
    this.uaParser.setUA(ua)
    return this.uaParser.getResult()
  }
}
