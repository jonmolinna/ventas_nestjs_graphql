import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { Product, ProductSchema } from './product.schema';

export type CategoryDocument = HydratedDocument<Category>;

@ObjectType()
@Schema()
export class Category {
  @Field(() => ID)
  _id: ObjectId;

  @Field(() => String)
  @Prop({ type: String, required: true, trim: true, lowercase: true })
  name: string;

  @Field({ nullable: true })
  @Prop()
  description?: string;

  @Field()
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Field(() => [Product])
  @Prop([ProductSchema])
  products: Product[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
