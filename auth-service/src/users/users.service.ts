import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(nom: string, prenom: string, email: string, password: string, role: UserRole = UserRole.TEAM_MEMBER): Promise<User> {
    // Check if user already exists
    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user
    const user = this.usersRepository.create({
      nom,
      prenom,
      email,
      password: hashedPassword,
      role,
    });

    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
  const user = await this.usersRepository.findOne({ where: { email } });
  if (!user) {
    throw new NotFoundException('User not found');
  }
  return user; 
}

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}