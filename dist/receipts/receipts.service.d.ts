import { Repository } from 'typeorm';
import { Receipt } from '../database/entities/receipts.entity';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
export declare class ReceiptsService {
    private readonly receiptRepo;
    constructor(receiptRepo: Repository<Receipt>);
    findAll(): Promise<Receipt[]>;
    findOne(receiptId: string): Promise<Receipt>;
    create(dto: CreateReceiptDto): Promise<Receipt>;
    update(receiptId: string, dto: UpdateReceiptDto): Promise<Receipt>;
    remove(receiptId: string): Promise<{
        deleted: boolean;
    }>;
}
