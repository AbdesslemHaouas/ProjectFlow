import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { getNextOrder } from './helpers';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const tasks = await this.tasksRepository.find({
      where: { projectId: createTaskDto.projectId },
    });
    const order = getNextOrder(tasks);
    const task = this.tasksRepository.create({ ...createTaskDto, order });
    return this.tasksRepository.save(task);
  }

  async findAll(projectId?: number, sprintId?: number, assigneeId?: number): Promise<Task[]> {
    const where: any = {};
    if (projectId) where.projectId = projectId;
    if (sprintId) where.sprintId = sprintId;
    if (assigneeId) where.assigneeId = assigneeId;

    return this.tasksRepository.find({
      where,
      relations: ['comments'],
      order: { order: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['comments'],
    });
    if (!task) throw new NotFoundException(`Task #${id} not found`);
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    Object.assign(task, updateTaskDto);
    return this.tasksRepository.save(task);
  }

  async updateStatus(id: number, status: string): Promise<Task> {
    const task = await this.findOne(id);
    task.status = status;
    return this.tasksRepository.save(task);
  }

  async remove(id: number): Promise<void> {
    const task = await this.findOne(id);
    await this.tasksRepository.remove(task);
  }
}


