import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private repo: Repository<Category>,
  ) {}

  create(data: { name: string }) {
  return this.repo.save(data);
}

  findAll() {
    return this.repo.find({ relations: ['products'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }
}