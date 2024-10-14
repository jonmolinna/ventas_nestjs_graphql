import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class authResponse {
  @Field()
  access_token: string;
}
