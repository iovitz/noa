import { Test, TestingModule } from '@nestjs/testing'
import { SqliteService } from './sqlite.service'

describe('sqliteService', () => {
  let service: SqliteService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SqliteService],
    }).compile()

    service = module.get<SqliteService>(SqliteService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
