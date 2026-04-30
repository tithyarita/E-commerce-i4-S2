import { Controller, Post, Get, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders') 
export class OrdersController {
  private orders: any[] = []; 
  constructor(private readonly ordersService: OrdersService) {} 

  @Get()
  findAll() {
    console.log('[GET /orders]');
    return { message: 'Orders retrieved', orders: this.orders };
  }

  @Post()
  create(@Body() createOrderDto: any) {
    console.log('[POST /orders]', createOrderDto);
    this.orders.push(createOrderDto); 
    return this.ordersService.createOrder(createOrderDto);
  }
} 
