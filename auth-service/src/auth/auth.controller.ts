import { Controller, Post, Body, Get, Headers, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(
      registerDto.nom,
      registerDto.prenom,
      registerDto.email,
      registerDto.password,
      registerDto.role,
    );
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Get('validate')
  async validate(@Headers('authorization') authHeader: string) {
    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }
    const token = authHeader.split(' ')[1];
    return this.authService.validateToken(token);
  }
}