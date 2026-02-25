import { 
  Controller, 
  Get, 
  Put, 
  Delete, 
  Param, 
  Body, 
  UseGuards 
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/guards/roles.decorator';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
}