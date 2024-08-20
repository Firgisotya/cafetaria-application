import { Controller, Get, Post, Body, Param, UseGuards, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from '../common/decorator/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('api/user')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    @ApiOperation({
      summary: 'GET ALL USER',
      description: 'Private endpoint to Create a new User. It is allowed only by "SUPERADMIN" users.'
    })
    @ApiResponse({status: 200, description: 'Ok', type: User, isArray: true})
    @ApiResponse({status: 400, description: 'Bad request'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({status: 500, description: 'Server error'}) 
    @Roles('SUPERADMIN')
    async findAll() {
      return this.userService.findAll();
    }

    @Get(':id')
    @ApiOperation({
      summary: 'GET USER BY ID',
      description: 'Private endpoint to get user data by a specific ID. <ul><li>The "user" role is permitted to access only their own information.</li><li>The "SUPERADMIN" role has the privilege to access information of any user</li></ul>'
    })
    @ApiResponse({status: 200, description: 'Ok', type: User})
    @ApiResponse({status: 401, description: 'Unauthorized'})             
    @ApiResponse({status: 500, description: 'Server error'})  
    @Roles('SUPERADMIN')
    async findOne(@Param('id') id: number) {
      return this.userService.findOne(+id);
    }

    @Post()
    @ApiOperation({
      summary: 'CREATE USER',
      description: 'Private endpoint to Create a new User. It is allowed only by "SUPERADMIN" users, and allows the creation of users with "SUPERADMIN" Role.'
    })
    @ApiResponse({status: 201, description: 'Created', type: User})
    @ApiResponse({status: 400, description: 'Bad request'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({status: 500, description: 'Server error'}) 
    @Roles('SUPERADMIN')
    async create(@Body() createUserDto: CreateUserDto) {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      return this.userService.create({
        ...createUserDto,
        password: hashedPassword,
      });
    }

    
    @Put(':id')
    @ApiOperation({
      summary: 'UPDATE USER BY ID',
      description: 'Private endpoint to update user data by Id. <ul><li>The "SUPERADMIN" role has the privilege to update information of any user</li></ul>'
    })
    @ApiResponse({status: 200, description: 'Ok', type: User})
    @ApiResponse({status: 400, description: 'Bad request'})             
    @ApiResponse({status: 401, description: 'Unauthorized'})             
    @ApiResponse({status: 500, description: 'Server error'})   
    @Roles('SUPERADMIN')
    async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
      if (updateUserDto.password) {
        const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
        return this.userService.update(+id, {
          ...updateUserDto,
          password: hashedPassword,
        });
      } else {
        return this.userService.update(+id, updateUserDto);
      }
    }

    @Delete(':id')
    @ApiOperation({
      summary: 'DELETE USER BY ID',
      description: 'Private endpoint to delete user by ID. <ul><li>The "admin" role has the privilege to delete any user</li></ul>'
    })
    @ApiOkResponse({content: {"application/json": {example: {"message": "User deleted"}}}})
    @ApiResponse({status: 400, description: 'Bad request'})             
    @ApiResponse({status: 401, description: 'Unauthorized'})             
    @ApiResponse({status: 500, description: 'Server error'}) 
    @Roles('SUPERADMIN')
    async destroy(@Param('id') id: number) {
      return this.userService.destroy(+id);
    }
}
