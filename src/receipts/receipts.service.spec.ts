import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Receipt } from '../database/entities/receipts.entity';
import { ReceiptsService } from './receipts.service';

describe('ReceiptsService', () => {
  let service: ReceiptsService;

  const receiptRepoMock = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReceiptsService,
        {
          provide: getRepositoryToken(Receipt),
          useValue: receiptRepoMock,
        },
      ],
    }).compile();

    service = module.get<ReceiptsService>(ReceiptsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});