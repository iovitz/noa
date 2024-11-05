import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SecurityController } from './security.controller'
import { SecurityService } from './security.service'
import { VerifyCode } from './verify-code.entity'

@Module({
  imports: [TypeOrmModule.forFeature([VerifyCode])],
  controllers: [SecurityController],
  providers: [SecurityService],
})
export class SecurityModule {}
