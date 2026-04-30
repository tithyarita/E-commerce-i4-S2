import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Int,
} from '@nestjs/graphql';

import { ProductService } from '../../product/product.service';
import { CategoryService } from '../../category/category.service';
import { ProductType } from '../types/product.type';
import { CategoryType } from '../types/category.type';

@Resolver(() => ProductType)
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
  ) {}

  // ✅ GET ALL PRODUCTS
  @Query(() => [ProductType])
  products() {
    return this.productService.findAll();
  }

  // ✅ GET ONE PRODUCT
  @Query(() => ProductType, { nullable: true })
  product(@Args('id', { type: () => Int }) id: number) {
    return this.productService.findOne(id);
  }

  // ✅ CREATE PRODUCT
  @Mutation(() => ProductType)
  createProduct(
    @Args('name') name: string,
    @Args('price', { type: () => Int }) price: number,
    @Args('categoryId', { type: () => Int }) categoryId: number,
  ) {
    return this.productService.create(name, price, categoryId);
  }

  // ✅ DELETE PRODUCT (FIXED 🚀)
  @Mutation(() => Boolean)
  async deleteProduct(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    await this.productService.remove(id);
    return true;
  }

  // ✅ RESOLVE CATEGORY FIELD
  @ResolveField(() => CategoryType, { nullable: true })
  category(@Parent() product: ProductType) {
    return this.categoryService.findOne(product.categoryId);
  }
}