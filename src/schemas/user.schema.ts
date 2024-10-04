import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import userRole from 'src/user/dto/role.interface';

export type UserDocument = HydratedDocument<User>;

@ObjectType()
@Schema()
export class User {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true })
  surname: string;

  @Field()
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Field()
  @Prop({
    type: String,
    required: true,
    enum: [userRole.admin, userRole.ventas],
  })
  role: string;

  @Field()
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
