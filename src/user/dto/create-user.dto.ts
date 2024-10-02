import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Validate } from 'class-validator';
import { UniqueUsernameValidator } from '../custom-validate/is-unique-constraint';

@InputType()
export class UserInput {
  @Field()
  @IsNotEmpty({ message: 'Ingrese un usuario' })
  @Validate(UniqueUsernameValidator, ['users', 'username'])
  username: string;

  @Field()
  @IsNotEmpty({ message: 'Ingrese una contraseña' })
  password: string;
}
