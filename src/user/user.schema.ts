import { Schema, Document } from 'mongoose';
import { Prop, SchemaFactory, Schema as MongooseSchema } from '@nestjs/mongoose';

@MongooseSchema()
export class UserDB extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  place: string;

  @Prop()
  expertise: string;

  @Prop()
  pincode:number;

  @Prop()
  phone:number;

  @Prop()
  email:string;

  @Prop()
  department:string;

  @Prop()
  religion:string;

  @Prop()
  language:string;

  @Prop()
  dob:string
}

export const UserSchema = SchemaFactory.createForClass(UserDB);
