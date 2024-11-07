import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {UserDB} from './user.schema'
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import * as bcrypt from 'bcryptjs'; 


interface User {
    id: number,
    name:string,
    place:string,
    expertise:string,    
    phone:number,
    email:string,
    department:string,
    religion:string,
    language:string,
    dob:Date,
    pincode:number
}



@Injectable()
export class UserService {
    private users: User[] = [];

    constructor(@InjectModel(UserDB.name) private userModel: Model<UserDB>) {}
    


    async findAll(){
        return await this.userModel.find().exec();
    }

    async findUserById(id: string) :Promise<UserDB> {
        const user = await this.userModel.findById(id).exec();
        return user || null
    }

    async findUserByName(name:string) : Promise <any>{
        const user =  await this.userModel.find({name:{$regex:name, $option:'i'}}).exec()
        if(!user){
            throw new NotFoundException(`User with name ${name} is not found in the database`)
        }
        return user
    }


    async create(createUserDto: CreateUserDto) : Promise<UserDB> {

        if (createUserDto.name.length < 2) {
            throw new BadRequestException('Name must be at least 2 characters long');
        }

        const newUser = new this.userModel(createUserDto)
        return newUser.save()

    }

    async update(id:string,updateUserDto:UpdateUserDto) : Promise<UserDB|null>{
        const user = await this.userModel.findByIdAndUpdate(id,updateUserDto,{new: true}).exec()
        return user || null
    }

    

    async deleteOne(id:string){
        const result = await this.userModel.findByIdAndDelete(id).exec()
        return result || null
    }


}
