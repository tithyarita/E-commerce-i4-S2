import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { Category } from '../category/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private repo: Repository<Product>,
  ) {}

  create(name: string, price: number, categoryId: number) {
  return this.repo.save({
    name,
    price,
    category: { id: categoryId } as any,
  });
}

  findAll() {
    return this.repo.find({ relations: ['category'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['category'] });
  }

   findByCategory(categoryId: number) {
  return this.repo.find({
    where: {
      category: {
        id: categoryId,
      },
    },
    relations: ['category'],
  });
}
    remove(id: number) {
  return this.repo.delete(id);
}
}