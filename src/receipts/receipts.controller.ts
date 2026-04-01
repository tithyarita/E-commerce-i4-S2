import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiKeyGuard } from '../common/guards/api-key.guard';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { ReceiptsService } from './receipts.service';

@ApiBearerAuth('x-api-key')
@UseGuards(ApiKeyGuard)
@Controller('receipts')
export class ReceiptsController {
	constructor(private readonly receiptsService: ReceiptsService) {}

	@ApiOperation({ summary: 'Get all receipts' })
	@ApiResponse({ status: 200, description: 'Returns all receipts' })
	@Get()
	async findAll() {
  const receipts = await this.receiptsService.findAll();
  return { receipts }; // wrap array inside an object
}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.receiptsService.findOne(id);
	}

	@Post()
	create(@Body() dto: CreateReceiptDto) {
		return this.receiptsService.create(dto);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() dto: UpdateReceiptDto) {
		return this.receiptsService.update(id, dto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.receiptsService.remove(id);
	}
}
