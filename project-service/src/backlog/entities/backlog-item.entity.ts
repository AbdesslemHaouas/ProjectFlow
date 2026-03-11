    import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Project } from '../../projects/entities/project.entity';

@Entity('backlog_items')
export class BacklogItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 'Story' })
  type: string;

  @Column({ default: 'Medium' })
  priority: string;

  @Column({ default: 'To Do' })
  status: string;

  @Column({ default: 0 })
  points: number;

  @Column({ type: 'int', nullable: true })
  assigneeId: number | null;

  @Column({ type: 'int', nullable: true })
  sprintId: number | null;

  @Column({ nullable: true })
  acceptanceCriteria: string;

  @Column()
  projectId: number;

  @Column({ default: 0 })
  order: number;

  @ManyToOne(() => Project, (project) => project.backlogItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}


