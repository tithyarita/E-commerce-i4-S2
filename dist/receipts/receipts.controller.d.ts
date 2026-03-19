import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { ReceiptsService } from './receipts.service';
export declare class ReceiptsController {
    private readonly receiptsService;
    constructor(receiptsService: ReceiptsService);
    findAll(): Promise<{
        receipts: import("../database/entities/receipts.entity").Receipt[];
    }>;
    findOne(id: string): Promise<import("../database/entities/receipts.entity").Receipt>;
    create(dto: CreateReceiptDto): Promise<import("../database/entities/receipts.entity").Receipt>;
    update(id: string, dto: UpdateReceiptDto): Promise<import("../database/entities/receipts.entity").Receipt>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
