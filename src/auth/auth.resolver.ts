import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { authResponse } from './dto/auth-response.dto';
import { authInput } from './dto/auth-input.dto';

@Resolver()
export class AuthResolver {
  @Mutation(() => authResponse, { name: 'authentication' })
  async login(@Args('input') input: authInput): Promise<authResponse> {
    return { access_token: 'token' };
  }
}
