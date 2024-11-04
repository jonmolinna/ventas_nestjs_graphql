import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Category, CategoryDocument } from 'src/schemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async addCategory(categoryDto: Partial<Category>): Promise<Category> {
    const category = new this.categoryModel(categoryDto);
    return category.save();
  }

  async findOneCatogryByName(name: string): Promise<CategoryDocument | any> {
    return await this.categoryModel.findOne({ name });
  }

  async findAllCategory(): Promise<Array<CategoryDocument>> {
    const categories = await this.categoryModel.find().populate('products');
    return categories;
  }

  async findOneCategoryById(id: ObjectId): Promise<CategoryDocument> {
    return await this.categoryModel.findById(id).populate('products');
  }

  async deleteCategory(id: ObjectId): Promise<boolean> {
    const result = await this.categoryModel.deleteOne({ _id: id });
    if (result.deletedCount > 0) {
      return true;
    }
    return false;
  }

  async updatedCategory(
    id: ObjectId,
    dto: Partial<Category>,
  ): Promise<CategoryDocument> {
    return await this.categoryModel.findByIdAndUpdate(
      { _id: id },
      {
        name: dto.name,
        description: dto.description,
      },
      {
        new: true,
      },
    );
  }
}
