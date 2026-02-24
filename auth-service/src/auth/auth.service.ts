import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(nom: string, prenom: string, email: string, password: string, role: UserRole) {
  const user = await this.usersService.create(nom, prenom, email, password, role);
  const { password: pass, ...result } = user;
  return {
    message: 'User registered successfully',
    user: result,
  };
}

  async login(email: string, password: string) {
  const user = await this.usersService.findByEmail(email);
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedException('Invalid credentials');
  }
  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
  };
  const { password: pass, ...result } = user;
  return {
    access_token: this.jwtService.sign(payload),
    user: result,
  };
}

  async validateToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.usersService.findById(payload.sub);
      return user;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}