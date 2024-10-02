import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UniqueUsernameValidator } from './custom-validate/is-unique-constraint';

@Module({
  providers: [UserService, UserResolver, UniqueUsernameValidator],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [],
})
export class UserModule {}
