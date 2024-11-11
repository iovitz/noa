import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RedisModule } from 'src/redis/redis.module'
import { EncryptService } from 'src/util/encrypt/encrypt.service'
import { VerifyCode } from '../sqlite/verify-code.entity'
import { SecurityController } from './security.controller'
import { SecurityService } from './security.service'

@Module({
  imports: [TypeOrmModule.forFeature([VerifyCode]), RedisModule],
  controllers: [SecurityController],
  providers: [SecurityService, EncryptService],
  exports: [SecurityService],
})
export class SecurityModule {}
