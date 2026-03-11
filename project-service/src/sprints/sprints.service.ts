import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sprint } from './entities/sprint.entity';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';

@Injectable()
export class SprintsService {
  constructor(
    @InjectRepository(Sprint)
    private sprintsRepository: Repository<Sprint>,
  ) {}

  async create(createSprintDto: CreateSprintDto): Promise<Sprint> {
    const sprint = this.sprintsRepository.create(createSprintDto);
    return this.sprintsRepository.save(sprint);
  }

  async findAll(projectId?: number): Promise<Sprint[]> {
    if (projectId) {
      return this.sprintsRepository.find({ where: { projectId } });
    }
    return this.sprintsRepository.find();
  }

  async findOne(id: number): Promise<Sprint> {
    const sprint = await this.sprintsRepository.findOne({ where: { id } });
    if (!sprint) throw new NotFoundException(`Sprint #${id} not found`);
    return sprint;
  }

  async update(id: number, updateSprintDto: UpdateSprintDto): Promise<Sprint> {
    const sprint = await this.findOne(id);
    Object.assign(sprint, updateSprintDto);
    return this.sprintsRepository.save(sprint);
  }

  async activate(id: number): Promise<Sprint> {
    const sprint = await this.findOne(id);
    if (sprint.status === 'Active') {
      throw new BadRequestException('Sprint is already active');
    }
    sprint.status = 'Active';
    return this.sprintsRepository.save(sprint);
  }

  async complete(id: number): Promise<Sprint> {
    const sprint = await this.findOne(id);
    if (sprint.status === 'Completed') {
      throw new BadRequestException('Sprint is already completed');
    }
    sprint.status = 'Completed';
    sprint.progress = 100;
    return this.sprintsRepository.save(sprint);
  }

  async remove(id: number): Promise<void> {
    const sprint = await this.findOne(id);
    await this.sprintsRepository.remove(sprint);
  }
}


