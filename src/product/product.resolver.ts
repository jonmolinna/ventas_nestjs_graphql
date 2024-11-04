import { Args, Mutation, Resolver, Query, ID } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from 'src/schemas/product.schema';
import { ProductInput } from './dto/product.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ParseObjectIdPipe } from 'src/pipes/parse-object-id-pipe.pipe';
import { ObjectId } from 'mongoose';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product, { name: 'addProduct' })
  @UseGuards(JwtAuthGuard)
  async addProduct(@Args('input') product: ProductInput): Promise<Product> {
    return this.productService.addProduct(product);
  }

  @Query(() => [Product], { name: 'products' })
  @UseGuards(JwtAuthGuard)
  async getAllProducts(): Promise<Product[]> {
    return await this.productService.findAllProducts();
  }

  @Query(() => Product, { name: 'product' })
  @UseGuards(JwtAuthGuard)
  async getProduct(
    @Args('id', { type: () => ID }, ParseObjectIdPipe) id: ObjectId,
  ): Promise<Product> {
    return await this.productService.findOneProductById(id);
  }

  @Mutation(() => Boolean, { name: 'deleteProduct' })
  @UseGuards(JwtAuthGuard)
  async deleteProduct(
    @Args('id', { type: () => ID }, ParseObjectIdPipe) id: ObjectId,
  ): Promise<boolean> {
    return await this.productService.deleteProduct(id);
  }

  @Mutation(() => Product, { name: 'updateProduct' })
  @UseGuards(JwtAuthGuard)
  async updatedProduct(
    @Args('id', { type: () => ID }, ParseObjectIdPipe) id: ObjectId,
    @Args('input') product: ProductInput,
  ): Promise<Product> {
    return this.productService.updatedProduct(id, product);
  }
}
