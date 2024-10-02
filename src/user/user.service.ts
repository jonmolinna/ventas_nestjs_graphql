import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private useModel: Model<User>) {}

  async createUser(userDto: Partial<User>): Promise<User> {
    const createUser = new this.useModel(userDto);
    return createUser.save();
  }

  async findOneUserByUsername(username: string): Promise<User | any> {
    return await this.useModel.findOne({ username: username });
  }
}
