import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, Validate } from 'class-validator';
import { UniqueUsernameValidator } from '../custom-validate/is-unique-constraint';
import userRole from './role.interface';

@InputType()
export class UserInput {
  @Field()
  @IsNotEmpty({ message: 'Ingrese un nombre' })
  name: string;

  @Field()
  @IsNotEmpty({ message: 'Ingrese un apellido' })
  surname: string;

  @Field()
  @IsNotEmpty({ message: 'Ingrese un usuario' })
  @Validate(UniqueUsernameValidator, ['users', 'username'])
  username: string;

  @Field()
  @IsNotEmpty({ message: 'Ingrese una contraseña' })
  password: string;

  @Field()
  @IsNotEmpty({ message: 'Ingrese un rol' })
  @IsEnum(userRole, {
    message: 'El rol debe ser uno de los siguientes valores: admin, ventas',
  })
  role: userRole;
}
