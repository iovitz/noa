import { Test, TestingModule } from '@nestjs/testing'
import { FormPageService } from './form-page.service'

describe('formPageService', () => {
  let service: FormPageService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormPageService],
    }).compile()

    service = module.get<FormPageService>(FormPageService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
