import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FormPageModule } from 'src/form-page/form-page.module'
import { PermissionModule } from 'src/permission/permission.module'
import { SpaceFile } from 'src/sqlite/space-files.entity'
import { SpaceController } from './space.controller'
import { SpaceService } from './space.service'

@Module({
  imports: [TypeOrmModule.forFeature([SpaceFile]), PermissionModule, FormPageModule],
  controllers: [SpaceController],
  providers: [SpaceService],
})
export class SpaceModule {}
