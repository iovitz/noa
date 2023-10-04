import { Controller, Get, Inject, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { STS } from 'ali-oss';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Controller('oss')
export class OssController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly configService: ConfigService,
  ) {}
  @Get('/ali_sts_key')
  async getAliSTSKey() {
    const sts = new STS({
      accessKeyId: this.configService.get('ali_cloud_access_key'),
      accessKeySecret: this.configService.get('ali_cloud_access_key_secret'),
    });
    console.log(this.configService.get('ali_cloud_arn'));
    const result = await sts.assumeRole(
      this.configService.get('ali_cloud_arn'),
    );
    return {
      AccessKeyId: result.credentials.AccessKeyId,
      AccessKeySecret: result.credentials.AccessKeySecret,
      SecurityToken: result.credentials.SecurityToken,
      Expiration: result.credentials.Expiration,
    };
  }
}
