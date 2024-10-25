import { Args, Mutation, Resolver, Query, ID } from '@nestjs/graphql';
import { Category } from 'src/schemas/category.schema';
import { CategoryService } from './category.service';
import { CategoryInput } from './dto/category.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ObjectId } from 'mongoose';
import { ParseObjectIdPipe } from 'src/pipes/parse-object-id-pipe.pipe';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category, { name: 'addCategory' })
  @UseGuards(JwtAuthGuard)
  async addCategory(@Args('input') category: CategoryInput): Promise<Category> {
    return this.categoryService.addCategory(category);
  }

  @Query(() => [Category], { name: 'categories' })
  @UseGuards(JwtAuthGuard)
  async getAllCategory(): Promise<Array<Category>> {
    return await this.categoryService.findAllCategory();
  }

  @Query(() => Category, { name: 'category' })
  @UseGuards(JwtAuthGuard)
  async getCategory(
    @Args('id', { type: () => ID }, ParseObjectIdPipe) id: ObjectId,
  ): Promise<Category> {
    return await this.categoryService.findOneCategoryById(id);
  }

  @Mutation(() => Boolean, { name: 'deleteCategory' })
  @UseGuards(JwtAuthGuard)
  async deleteCategory(
    @Args('id', { type: () => ID }, ParseObjectIdPipe) id: ObjectId,
  ): Promise<boolean> {
    return await this.categoryService.deleteCategory(id);
  }

  @Mutation(() => Category, { name: 'updateCategory' })
  @UseGuards(JwtAuthGuard)
  async updatedCategory(
    @Args('id', { type: () => ID }, ParseObjectIdPipe) id: ObjectId,
    @Args('input') category: CategoryInput,
  ): Promise<Category> {
    return this.categoryService.updatedCategory(id, category);
  }
}
