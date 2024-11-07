import { UserService } from './user.service';
import { BadRequestException, Body, Controller,Delete,Get,NotFoundException,Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UserDB } from './user.schema';
import { UpdateUserDto } from './update-user.dto';
import { AuthGuard } from '@nestjs/passport';

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

@Controller('user')
export class UserController {
    constructor (private readonly userService: UserService){}

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Get()
    async findAll():Promise <any>{
        const users = await this.userService.findAll()
        if (!users) {
            throw new NotFoundException('No users found');
        }
        return users;
    }

    @Get(":id")
    async findOne(@Param('id') id:string): Promise<UserDB>{
        const user = await this.userService.findUserById(id)
        if (!user) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto):Promise<UserDB>{
        if (!createUserDto.name || !createUserDto.place || !createUserDto.expertise) {
            throw new BadRequestException('Name, place, and expertise are required fields');
        }
        const createdUser = await this.userService.create(createUserDto)
        return createdUser
    }

    @Put(':id')
    async update(@Param('id') id:string,@Body() updateUserDto:UpdateUserDto):Promise <UserDB|null>{
        if (!updateUserDto.name && !updateUserDto.place && !updateUserDto.expertise) {
            throw new BadRequestException('At least one field (name, place, or expertise) must be provided for update');
        }
        const updatedUser = await this.userService.update(id,updateUserDto)
        if (!updatedUser) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return updatedUser;
    }

    @Delete(':id')
    async deleteOne(@Param('id') id:string):Promise <any>{
        const deletedUser = await this.userService.deleteOne(id)
        if(!deletedUser){
            throw new NotFoundException(`User with ID ${id} is not found in the database`)
        }
        return { message: `User with ID ${id} has been deleted successfully.` };
    }
    
}
