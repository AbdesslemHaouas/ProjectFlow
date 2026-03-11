import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BacklogItem } from './entities/backlog-item.entity';
import { CreateBacklogItemDto } from './dto/create-backlog-item.dto';
import { UpdateBacklogItemDto } from './dto/update-backlog-item.dto';
import { getNextOrder } from './helpers';

@Injectable()
export class BacklogService {
  constructor(
    @InjectRepository(BacklogItem)
    private backlogRepository: Repository<BacklogItem>,
  ) {}

  async create(createBacklogItemDto: CreateBacklogItemDto): Promise<BacklogItem> {
    const items = await this.backlogRepository.find({
      where: { projectId: createBacklogItemDto.projectId },
    });
    const order = getNextOrder(items);
    const item = this.backlogRepository.create({
      ...createBacklogItemDto,
      order,
    });
    return this.backlogRepository.save(item);
  }

  async findAll(projectId?: number, sprintId?: number): Promise<BacklogItem[]> {
    if (projectId) {
      return this.backlogRepository.find({
        where: { projectId },
        order: { order: 'ASC' },
      });
    }
    if (sprintId) {
      return this.backlogRepository.find({
        where: { sprintId },
        order: { order: 'ASC' },
      });
    }
    return this.backlogRepository.find({ order: { order: 'ASC' } });
  }

  async findOne(id: number): Promise<BacklogItem> {
    const item = await this.backlogRepository.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Backlog item #${id} not found`);
    return item;
  }

  async update(id: number, updateBacklogItemDto: UpdateBacklogItemDto): Promise<BacklogItem> {
    const item = await this.findOne(id);
    Object.assign(item, updateBacklogItemDto);
    return this.backlogRepository.save(item);
  }

  async assignToSprint(id: number, sprintId: number): Promise<BacklogItem> {
    const item = await this.findOne(id);
    item.sprintId = sprintId;
    item.status = 'In Sprint';
    return this.backlogRepository.save(item);
  }

  async removeFromSprint(id: number): Promise<BacklogItem> {
    const item = await this.findOne(id);
    item.sprintId = null;
    item.status = 'To Do';
    return this.backlogRepository.save(item);
  }

  async remove(id: number): Promise<void> {
    const item = await this.findOne(id);
    await this.backlogRepository.remove(item);
  }
}

