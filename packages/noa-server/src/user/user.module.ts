import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SecurityModule } from 'src/security/security.module'
import { OAuth } from 'src/sqlite/oauth.entity'
import { Users } from '../sqlite/users.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [TypeOrmModule.forFeature([Users, OAuth]), SecurityModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
