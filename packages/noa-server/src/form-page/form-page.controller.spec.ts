import { Test, TestingModule } from '@nestjs/testing'
import { FormPageController } from './form-page.controller'

describe('formPageController', () => {
  let controller: FormPageController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormPageController],
    }).compile()

    controller = module.get<FormPageController>(FormPageController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
