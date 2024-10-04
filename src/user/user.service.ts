import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private saltOrRounds = 10;

  constructor(@InjectModel(User.name) private useModel: Model<User>) {}

  async createUser(userDto: Partial<User>): Promise<User> {
    const hash = await bcrypt.hash(userDto.name, this.saltOrRounds);

    const createUser = new this.useModel({ ...userDto, password: hash });
    return createUser.save();
  }

  async findOneUserByUsername(username: string): Promise<User | any> {
    return await this.useModel.findOne({ username: username });
  }
}
