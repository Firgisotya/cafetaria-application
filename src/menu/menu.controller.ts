import { Controller, Get, Post, Body, Param, UseGuards, Put, Delete } from '@nestjs/common';
import { Roles } from '../common/decorator/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { Menu } from './entities/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';

@Controller('api/menu')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MenuController {
    constructor(private menuService: MenuService) {}

    @Get()
    @ApiOperation({ 
        summary: 'GET ALL MENU',
        description: 'Private endpoint to get all menus. It is allowed all users.'
    })
    @ApiResponse({status: 200, description: 'Ok', type: Menu, isArray: true})
    @ApiResponse({status: 400, description: 'Bad request'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({status: 500, description: 'Server error'}) 
    async findAll() {
        return this.menuService.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'GET MENU BY ID',
        description: 'Private endpoint to get menu data by a specific ID.'
    })
    @ApiResponse({status: 200, description: 'Ok', type: Menu})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({status: 500, description: 'Server error'})
    @Roles('MANAGER', 'SUPERADMIN')
    async findOne(@Param('id') id: number) {
        return this.menuService.findOne(+id);
    }

    @Post()
    @ApiOperation({
        summary: 'CREATE MENU',
        description: 'Private endpoint to create a new menu. It is allowed only by "Manager" users.'
    })
    @ApiResponse({status: 200, description: 'Created', type: Menu})
    @ApiResponse({status: 400, description: 'Bad request'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({status: 500, description: 'Server error'})
    @Roles('MANAGER', 'SUPERADMIN')
    async create(@Body() createMenuDto: CreateMenuDto) {
        return this.menuService.create(createMenuDto);
    }

    @Put(':id')
    @ApiOperation({
        summary: 'UPDATE MENU',
        description: 'Private endpoint to update a menu. It is allowed only by "Manager" users.'
    })
    @ApiResponse({status: 200, description: 'Ok', type: Menu})
    @ApiResponse({status: 400, description: 'Bad request'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({status: 500, description: 'Server error'})
    @Roles('MANAGER', 'SUPERADMIN')
    async update(@Param('id') id: number, @Body() updateMenuDto: CreateMenuDto) {
        return this.menuService.update(+id, updateMenuDto);
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'DELETE MENU',
        description: 'Private endpoint to delete a menu. It is allowed only by "Manager" users.'
    })
    @ApiResponse({status: 200, description: 'Ok', type: Menu})
    @ApiResponse({status: 400, description: 'Bad request'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({status: 500, description: 'Server error'})
    @Roles('MANAGER', 'SUPERADMIN')
    async destroy(@Param('id') id: number) {
        return this.menuService.destroy(+id);
    }
}
