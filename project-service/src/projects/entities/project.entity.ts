import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Sprint } from '../../sprints/entities/sprint.entity';
import { BacklogItem } from '../../backlog/entities/backlog-item.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 'Scrum' })
  type: string;

  @Column({ default: 'Planned' })
  status: string;

  @Column()
  chefProjetId: number;

  @Column({ nullable: true })
  startDate: string;

  @Column({ nullable: true })
  endDate: string;

  @Column({ default: 0 })
  progress: number;

  @Column({ type: 'int', array: true, default: [] })
  memberIds: number[];

  @OneToMany(() => Sprint, (sprint) => sprint.project, { cascade: true })
  sprints: Sprint[];

  @OneToMany(() => BacklogItem, (item) => item.project, { cascade: true })
  backlogItems: BacklogItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

