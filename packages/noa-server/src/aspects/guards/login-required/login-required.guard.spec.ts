import { LoginRequiredGuard } from './login-required.guard'

describe('loginRequiredGuard', () => {
  it('should be defined', () => {
    expect(new LoginRequiredGuard()).toBeDefined()
  })
})
