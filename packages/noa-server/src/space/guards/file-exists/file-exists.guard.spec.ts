import { FileExistsGuard } from './file-exists.guard'

describe('fileExistsGuard', () => {
  it('should be defined', () => {
    expect(new FileExistsGuard()).toBeDefined()
  })
})
