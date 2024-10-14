import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class authInput {
  @Field()
  username: string;

  @Field()
  password: string;
}
