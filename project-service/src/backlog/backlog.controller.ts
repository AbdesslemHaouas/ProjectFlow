import {
  Controller, Get, Post, Put, Delete,
  Body, Param, Query, ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { BacklogService } from './backlog.service';
import { CreateBacklogItemDto } from './dto/create-backlog-item.dto';
import { UpdateBacklogItemDto } from './dto/update-backlog-item.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('backlog')
@UseGuards(JwtAuthGuard)
export class BacklogController {
  constructor(private readonly backlogService: BacklogService) {}

  @Post()
  create(@Body() createBacklogItemDto: CreateBacklogItemDto) {
    return this.backlogService.create(createBacklogItemDto);
  }

  @Get()
  findAll(
    @Query('projectId') projectId?: string,
    @Query('sprintId') sprintId?: string,
  ) {
    return this.backlogService.findAll(
      projectId ? parseInt(projectId) : undefined,
      sprintId ? parseInt(sprintId) : undefined,
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.backlogService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBacklogItemDto: UpdateBacklogItemDto,
  ) {
    return this.backlogService.update(id, updateBacklogItemDto);
  }

  @Put(':id/sprint/:sprintId')
  assignToSprint(
    @Param('id', ParseIntPipe) id: number,
    @Param('sprintId', ParseIntPipe) sprintId: number,
  ) {
    return this.backlogService.assignToSprint(id, sprintId);
  }

  @Put(':id/remove-sprint')
  removeFromSprint(@Param('id', ParseIntPipe) id: number) {
    return this.backlogService.removeFromSprint(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.backlogService.remove(id);
  }
}

