import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SecurityModule } from 'src/security/security.module'
import { EncryptService } from 'src/util/encrypt/encrypt.service'
import { User } from '../sqlite/user.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [TypeOrmModule.forFeature([User]), SecurityModule],
  controllers: [UserController],
  providers: [UserService, EncryptService],
})
export class UserModule {}
