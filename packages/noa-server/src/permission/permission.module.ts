import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FilePermission } from 'src/sqlite/file-permission.entity'
import { PermissionController } from './permission.controller'
import { PermissionService } from './permission.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([FilePermission]),
  ],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
