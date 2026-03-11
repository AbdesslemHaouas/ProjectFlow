import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 'Todo' })
  status: string;

  @Column({ default: 'Medium' })
  priority: string;

  @Column({ nullable: true })
  dueDate: string;

  @Column({ default: 0 })
  storyPoints: number;

  @Column({ nullable: true })
  assigneeId: number;

  @Column()
  projectId: number;

  @Column({ nullable: true })
  sprintId: number;

  @Column({ nullable: true })
  backlogItemId: number;

  @Column({ default: 0 })
  order: number;

  @OneToMany(() => Comment, (comment) => comment.task, { cascade: true })
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

