import { PageExistsGuard } from './page-exists.guard'

describe('pageExistsGuard', () => {
  it('should be defined', () => {
    expect(new PageExistsGuard()).toBeDefined()
  })
})
