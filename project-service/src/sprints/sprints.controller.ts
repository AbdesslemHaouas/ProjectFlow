import {
  Controller, Get, Post, Put, Delete,
  Body, Param, Query, ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { SprintsService } from './sprints.service';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('sprints')
@UseGuards(JwtAuthGuard)
export class SprintsController {
  constructor(private readonly sprintsService: SprintsService) {}

  @Post()
  create(@Body() createSprintDto: CreateSprintDto) {
    return this.sprintsService.create(createSprintDto);
  }

  @Get()
  findAll(@Query('projectId') projectId?: string) {
    return this.sprintsService.findAll(projectId ? parseInt(projectId) : undefined);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sprintsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSprintDto: UpdateSprintDto,
  ) {
    return this.sprintsService.update(id, updateSprintDto);
  }

  @Put(':id/activate')
  activate(@Param('id', ParseIntPipe) id: number) {
    return this.sprintsService.activate(id);
  }

  @Put(':id/complete')
  complete(@Param('id', ParseIntPipe) id: number) {
    return this.sprintsService.complete(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sprintsService.remove(id);
  }
}


