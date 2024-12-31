import { FilePermissionGuard } from './file-permission.guard';

describe('FilePermissionGuard', () => {
  it('should be defined', () => {
    expect(new FilePermissionGuard()).toBeDefined();
  });
});
