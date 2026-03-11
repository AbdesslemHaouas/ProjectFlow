import { 
  Controller, 
  Get, 
  Post,
  Put, 
  Delete, 
  Param, 
  Body, 
  UseGuards,
  Request
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/guards/roles.decorator';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from './entities/user.entity';

class CreateApprovedUserDto {
  @IsString()
  nom: string;

  @IsString()
  prenom: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('approved')
  @Roles('admin')
  createApproved(@Body() dto: CreateApprovedUserDto) {
    return this.usersService.createApproved(dto.nom, dto.prenom, dto.email, dto.password, dto.role);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(+id);
  }

  @Get(':id/permissions')
  @Roles('admin')
  getPermissions(@Param('id') id: string) {
    return this.usersService.getUserPermissions(+id);
  }

  @Put(':id/permissions')
  @Roles('admin')
  setPermissions(@Param('id') id: string, @Body() permissions: Record<string, boolean>) {
    return this.usersService.setUserPermissions(+id, permissions);
  }

  @Put(':id')
  @Roles('admin')
  updateUser(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.updateUser(+id, updateUserDto);
  }

  @Put(':id/role')
  @Roles('admin')
  updateRole(
    @Param('id') id: string, 
    @Body() updateRoleDto: UpdateRoleDto
  ) {
    return this.usersService.updateRole(+id, updateRoleDto);
  }

  @Put(':id/status')
  @Roles('admin')
  updateStatus(
    @Param('id') id: string, 
    @Body() updateStatusDto: UpdateStatusDto
  ) {
    return this.usersService.updateStatus(+id, updateStatusDto);
  }

  @Delete(':id')
  @Roles('admin')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(+id);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@Request() req: any) {
    return this.usersService.findById(req.user.id);
  }

  @Get('me/permissions')
  @UseGuards(JwtAuthGuard)
  getMyPermissions(@Request() req: any) {
    return this.usersService.getUserPermissions(req.user.id);
  }

  @Put('me/profile')
  @UseGuards(JwtAuthGuard)
  updateMyProfile(
    @Request() req: any,
    @Body() updateProfileDto: UpdateProfileDto
  ) {
    return this.usersService.updateProfile(req.user.id, updateProfileDto);
  }

  @Put('me/password')
  @UseGuards(JwtAuthGuard)
  updateMyPassword(
    @Request() req: any,
    @Body() updatePasswordDto: UpdatePasswordDto
  ) {
    return this.usersService.updatePassword(req.user.id, updatePasswordDto);
  }
}