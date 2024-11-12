import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { VerifyCode } from '../sqlite/verify-code.entity'
import { SecurityController } from './security.controller'
import { SecurityService } from './security.service'

@Module({
  imports: [TypeOrmModule.forFeature([VerifyCode])],
  controllers: [SecurityController],
  providers: [SecurityService],
  exports: [SecurityService],
})
export class SecurityModule {}
