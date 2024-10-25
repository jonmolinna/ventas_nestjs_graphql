import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Validate } from 'class-validator';
import { UniqueCategoryNameValidator } from 'src/category/custom-validate/is-unique-constraint';

@InputType()
export class CategoryInput {
  @Field()
  @IsNotEmpty({ message: 'Ingrese una categoria' })
  @Validate(UniqueCategoryNameValidator, ['catogory', 'name'])
  name: string;

  @Field({ nullable: true })
  description?: string;
}
