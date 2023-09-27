import { Test, TestingModule } from '@nestjs/testing';
import { Wsv1Gateway } from './wsv1.gateway';

describe('Wsv1Gateway', () => {
  let gateway: Wsv1Gateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Wsv1Gateway],
    }).compile();

    gateway = module.get<Wsv1Gateway>(Wsv1Gateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
