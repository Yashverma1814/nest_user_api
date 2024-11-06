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
}

export const UserSchema = SchemaFactory.createForClass(UserDB);
