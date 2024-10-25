import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CategoryService } from '../category.service';

@ValidatorConstraint({ name: 'unique', async: true })
@Injectable()
export class UniqueCategoryNameValidator
  implements ValidatorConstraintInterface
{
  constructor(private readonly categoryService: CategoryService) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const [entityClass, fieldName] =
      validationArguments.constraints as string[];

    const column = { [fieldName]: value };
    const name = column?.name;
    const category = await this.categoryService.findOneCatogryByName(name);
    return !category;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'El nombre de la categoria ya existe';
  }
}
