import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto, authorId: number): Promise<Comment> {
    const comment = this.commentsRepository.create({
      ...createCommentDto,
      authorId,
    });
    return this.commentsRepository.save(comment);
  }

  async findByTask(taskId: number): Promise<Comment[]> {
    return this.commentsRepository.find({
      where: { taskId },
      order: { createdAt: 'ASC' },
    });
  }

  async remove(id: number): Promise<void> {
    const comment = await this.commentsRepository.findOne({ where: { id } });
    if (!comment) throw new NotFoundException(`Comment #${id} not found`);
    await this.commentsRepository.remove(comment);
  }
}