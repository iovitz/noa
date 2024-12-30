import { PageExistsGuard } from './page-exists.guard';

describe('PageExistsGuard', () => {
  it('should be defined', () => {
    expect(new PageExistsGuard()).toBeDefined();
  });
});
