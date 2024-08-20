import { Controller, Get, Post, Body, Param, UseGuards, Put, Delete } from '@nestjs/common';
import { Roles } from '../common/decorator/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CafeService } from './cafe.service';
import { Cafe } from './entities/cafe.entity';
import { CreateCafeDto } from './dto/create-cafe.dto';

@Controller('api/cafe')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CafeController {
    constructor(private cafeService: CafeService) {}

    @Get()
    @ApiOperation({ 
        summary: 'GET ALL CAFE',
        description: 'Private endpoint to get all cafes. It is allowed all users.'
    })
    @ApiResponse({status: 200, description: 'Ok', type: Cafe, isArray: true})
    @ApiResponse({status: 400, description: 'Bad request'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({status: 500, description: 'Server error'}) 
    async findAll() {
        return this.cafeService.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'GET CAFE BY ID',
        description: 'Private endpoint to get cafe data by a specific ID.'
    })
    @ApiResponse({status: 200, description: 'Ok', type: Cafe})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({status: 500, description: 'Server error'})
    @Roles('OWNER', 'SUPERADMIN')
    async findOne(@Param('id') id: number) {
        return this.cafeService.findOne(+id);
    }

    @Post()
    @ApiOperation({
        summary: 'CREATE CAFE',
        description: 'Private endpoint to create a new cafe. It is allowed only by "OWNER" users.'
    })
    @ApiResponse({status: 201, description: 'Created', type: Cafe})
    @ApiResponse({status: 400, description: 'Bad request'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({status: 500, description: 'Server error'})
    @Roles('OWNER', 'SUPERADMIN')
    async create(@Body() createCafeDto: CreateCafeDto) {
        return this.cafeService.create(createCafeDto);
    }

    @Put(':id')
    @ApiOperation({
        summary: 'UPDATE CAFE',
        description: 'Private endpoint to update a cafe. It is allowed only by "OWNER" users.'
    })
    @ApiResponse({status: 200, description: 'Ok', type: Cafe})
    @ApiResponse({status: 400, description: 'Bad request'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({status: 500, description: 'Server error'})
    @Roles('OWNER', 'SUPERADMIN')
    async update(@Param('id') id: number, @Body() updateCafeDto: CreateCafeDto) {
        return this.cafeService.update(+id, updateCafeDto);
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'DELETE CAFE',
        description: 'Private endpoint to delete a cafe. It is allowed only by "OWNER" users.'
    })
    @ApiResponse({status: 200, description: 'Ok', type: Cafe})
    @ApiResponse({status: 400, description: 'Bad request'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({status: 500, description: 'Server error'})
    @Roles('OWNER', 'SUPERADMIN')
    async destroy(@Param('id') id: number) {
        return this.cafeService.destroy(+id);
    }
}
