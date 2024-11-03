import { Global, Module } from '@nestjs/common'
import { SqliteService } from './sqlite/sqlite.service'

@Global()
@Module({
  providers: [SqliteService],
  exports: [SqliteService],
})
export class DbModule {}
