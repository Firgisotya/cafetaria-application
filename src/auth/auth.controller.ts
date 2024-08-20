import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'LOGIN',
    description: 'Login to get access token',
  })
  @ApiResponse({status: 200, description: 'Ok', type: Object})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({status: 500, description: 'Server error'})
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    if (!user) {
        return { message: 'Invalid credentials' };
    }
    return this.authService.login(user);
  }

  @Post('register')
  @ApiOperation({
    summary: 'REGISTER',
    description: 'Register to create a new user',
  })
  @ApiResponse({status: 201, description: 'Created', type: Object})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({status: 500, description: 'Server error'})
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
