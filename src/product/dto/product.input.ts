import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

@InputType()
export class ProductInput {
  @Field(() => String)
  @IsNotEmpty({ message: 'Ingrese un producto' })
  name: string;

  @Field(() => Float)
  @IsNotEmpty({ message: 'Ingrese un precio' })
  price: number;

  @Field(() => ID)
  @IsNotEmpty({ message: 'Ingrese una categoria' })
  category: ObjectId;
}
