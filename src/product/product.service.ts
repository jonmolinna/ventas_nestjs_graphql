import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Product, ProductDocument } from 'src/schemas/product.schema';
import { ProductInput } from './dto/product.input';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async addProduct(dto: ProductInput): Promise<Product> {
    const product = await this.productModel.create(dto);
    return await product.populate('category');
  }

  async getAllPProductsByCategory(idCategory: ObjectId): Promise<Product[]> {
    const products = await this.productModel
      .find({ category: idCategory })
      .populate('category');
    return products;
  }

  async findAllProducts(): Promise<Array<ProductDocument>> {
    const products = await this.productModel.find().populate('category');
    return products;
  }

  async findOneProductById(id: ObjectId): Promise<ProductDocument> {
    return await this.productModel.findById(id).populate('category');
  }

  async deleteProduct(id: ObjectId): Promise<boolean> {
    const result = await this.productModel.deleteOne({ _id: id });
    if (result.deletedCount > 0) {
      return true;
    }
    return false;
  }

  async updatedProduct(
    id: ObjectId,
    dto: ProductInput,
  ): Promise<ProductDocument> {
    return await this.productModel
      .findByIdAndUpdate(
        { _id: id },
        {
          name: dto.name,
          price: dto.price,
          category: dto.category,
        },
        { new: true },
      )
      .populate('category');
  }
}
