import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../user.service';

@ValidatorConstraint({ name: 'unique', async: true })
@Injectable()
export class UniqueUsernameValidator implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const [entityClass, fieldName] =
      validationArguments.constraints as string[];
    const column = { [fieldName]: value };
    const username = column?.username;
    const user = await this.userService.findOneUserByUsername(username);
    return !user;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Ya existe el usuario';
  }
}
