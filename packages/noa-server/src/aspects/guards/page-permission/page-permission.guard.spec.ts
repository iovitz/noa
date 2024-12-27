import { PagePermissionGuard } from './page-permission.guard'

describe('pagePermissionGuard', () => {
  it('should be defined', () => {
    expect(new PagePermissionGuard()).toBeDefined()
  })
})
