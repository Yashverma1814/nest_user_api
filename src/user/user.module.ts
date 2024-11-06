// user.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDB, UserSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserDB.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // Optional: if you need to use UserService in other modules
})
export class UserModule {}
