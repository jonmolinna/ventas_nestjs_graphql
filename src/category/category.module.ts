import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/schemas/category.schema';
import { UniqueCategoryNameValidator } from 'src/category/custom-validate/is-unique-constraint';

@Module({
  providers: [CategoryService, CategoryResolver, UniqueCategoryNameValidator],
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
})
export class CategoryModule {}