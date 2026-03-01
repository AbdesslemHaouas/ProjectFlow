import { 
  Controller, 
  Get, 
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


@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

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