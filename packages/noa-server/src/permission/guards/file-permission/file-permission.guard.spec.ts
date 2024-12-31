import { FilePermissionGuard } from './file-permission.guard'

describe('filePermissionGuard', () => {
  it('should be defined', () => {
    expect(new FilePermissionGuard()).toBeDefined()
  })
})
