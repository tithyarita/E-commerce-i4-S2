import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryService } from '../../category/category.service';
import { CategoryType } from '../types/category.type';

@Resolver('Category')
export class CategoryResolver {
  constructor(private service: CategoryService) {}

  @Query(() => [CategoryType]) 
  categories() {
    return this.service.findAll();
  }

  @Mutation(() => CategoryType)
  createCategory(@Args('name') name: string) {
  return this.service.create({ name });
  }
}