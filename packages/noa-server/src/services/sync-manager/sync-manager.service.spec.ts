import { Test, TestingModule } from '@nestjs/testing'
import { SyncManagerService } from './sync-manager.service'

describe('syncManagerService', () => {
  let service: SyncManagerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SyncManagerService],
    }).compile()

    service = module.get<SyncManagerService>(SyncManagerService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
