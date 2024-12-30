import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PagePermission } from 'src/sqlite/page-permission.entity'
import { PermissionController } from './permission.controller'
import { PermissionService } from './permission.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([PagePermission]),
  ],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
