import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Category } from './category.schema';

export type ProductDocument = HydratedDocument<Product>;

@ObjectType()
@Schema()
export class Product {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  @Prop({ type: String, trim: true, lowercase: true })
  name: string;

  @Field(() => Float)
  @Prop()
  price: number;

  @Field(() => String)
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Field(() => Category)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
