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
  dob:Date;

  @Prop()
  gender:string;

  @Prop()
  nationality:string;
  
  @Prop()
  aadhaarNo:number;
  
  @Prop()
  address:string;
  
  @Prop()
  bloodGrp:string;
  
  @Prop()
  fatherName:string;
  
  @Prop()
  motherName:string;
  
  @Prop()
  employed:boolean;
  
  @Prop()
  married:boolean;
}

export const UserSchema = SchemaFactory.createForClass(UserDB);
