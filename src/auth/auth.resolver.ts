import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { authResponse } from './dto/auth-response.dto';
import { authInput } from './dto/auth-input.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guard/auth-gql.guard';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => authResponse, { name: 'authentication' })
  @UseGuards(GqlAuthGuard)
  async login(
    @Args('input') input: authInput,
    @Context() context,
  ): Promise<authResponse> {
    return this.authService.login(context.user);
  }
}
