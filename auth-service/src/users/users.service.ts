import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole, UserStatus } from './entities/user.entity';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(nom: string, prenom: string, email: string, password: string, role: UserRole = UserRole.TEAM_MEMBER): Promise<User> {
    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      nom,
      prenom,
      email,
      password: hashedPassword,
      role,
      status: UserStatus.PENDING,
    });
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: {
        id: true,
        nom: true,
        prenom: true,
        email: true,
        role: true,
        status: true,
        isActive: true,
        createdAt: true,
      }
    });
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ 
      where: { id },
      select: {
        id: true,
        nom: true,
        prenom: true,
        email: true,
        role: true,
        status: true,
        isActive: true,
        createdAt: true,
      }
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateRole(id: number, updateRoleDto: UpdateRoleDto): Promise<User> {
    await this.findById(id);
    await this.usersRepository.update(id, { role: updateRoleDto.role });
    return this.findById(id);
  }

  async updateStatus(id: number, updateStatusDto: UpdateStatusDto): Promise<User> {
    await this.findById(id);
    await this.usersRepository.update(id, { status: updateStatusDto.status });
    return this.findById(id);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.findById(id);
    await this.usersRepository.update(id, updateUserDto);
    return this.findById(id);
  }

  async deleteUser(id: number): Promise<{ message: string }> {
    await this.findById(id);
    await this.usersRepository.delete(id);
    return { message: 'User deleted successfully' };
  }
  async updateProfile(id: number, updateProfileDto: UpdateProfileDto): Promise<User> {
  const user = await this.findById(id);
  
  // Check if email is already taken by another user
  if (updateProfileDto.email && updateProfileDto.email !== user.email) {
    const existing = await this.usersRepository.findOne({ 
      where: { email: updateProfileDto.email } 
    });
    if (existing) {
      throw new ConflictException('Email already exists');
    }
  }

  await this.usersRepository.update(id, updateProfileDto);
  return this.findById(id);
}

async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto): Promise<{ message: string }> {
  const user = await this.usersRepository.findOne({ where: { id } });
  if (!user) throw new NotFoundException('User not found');

  // Check current password
  const isValid = await bcrypt.compare(updatePasswordDto.currentPassword, user.password);
  if (!isValid) {
    throw new UnauthorizedException('Current password is incorrect');
  }

  // Hash new password
  const hashed = await bcrypt.hash(updatePasswordDto.newPassword, 10);
  await this.usersRepository.update(id, { password: hashed });

  return { message: 'Password updated successfully' };
}
}