import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from 'src/schemas/user.schema';
import { UserService } from './user.service';
import { UserInput } from './dto/create-user.dto';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  hello(): string {
    return 'Hello World';
  }

  @Mutation(() => User, { name: 'createUser' })
  async create(@Args('input') user: UserInput): Promise<User> {
    return this.userService.createUser(user);
  }
}
