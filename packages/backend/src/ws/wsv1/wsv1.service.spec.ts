import { Test, TestingModule } from '@nestjs/testing';
import { Wsv1Service } from './wsv1.service';

describe('Wsv1Service', () => {
  let service: Wsv1Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Wsv1Service],
    }).compile();

    service = module.get<Wsv1Service>(Wsv1Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
