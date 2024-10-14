import { Injectable } from '@nestjs/common';
import { UserDocument } from 'src/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<UserDocument | any> {
    const user: UserDocument =
      await this.userService.findOneUserByUsername(username);

    if (user && (await bcrypt.compare(pass, user.password))) {
      const payload = {
        _id: user._id,
        username: user.username,
        role: user.role,
      };

      return payload;
    }

    return null;
  }
}
