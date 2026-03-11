import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = this.projectsRepository.create({
      ...createProjectDto,
      memberIds: createProjectDto.memberIds || [],
    });
    return this.projectsRepository.save(project);
  }

  async findAll(user: any): Promise<Project[]> {
    if (user.role === 'admin') {
      return this.projectsRepository.find({
        relations: ['sprints', 'backlogItems'],
      });
    }
    return this.projectsRepository.find({
      where: { chefProjetId: user.id },
      relations: ['sprints', 'backlogItems'],
    });
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.projectsRepository.findOne({
      where: { id },
      relations: ['sprints', 'backlogItems'],
    });
    if (!project) throw new NotFoundException(`Project #${id} not found`);
    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.findOne(id);
    Object.assign(project, updateProjectDto);
    return this.projectsRepository.save(project);
  }

  async remove(id: number): Promise<void> {
    const project = await this.findOne(id);
    await this.projectsRepository.remove(project);
  }

  async addMember(id: number, userId: number): Promise<Project> {
    const project = await this.findOne(id);
    if (!project.memberIds.includes(userId)) {
      project.memberIds = [...project.memberIds, userId];
      return this.projectsRepository.save(project);
    }
    return project;
  }

  async removeMember(id: number, userId: number): Promise<Project> {
    const project = await this.findOne(id);
    project.memberIds = project.memberIds.filter(mid => mid !== userId);
    return this.projectsRepository.save(project);
  }
}

