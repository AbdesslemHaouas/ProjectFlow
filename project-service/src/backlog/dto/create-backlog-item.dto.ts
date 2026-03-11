import { IsString, IsOptional, IsNumber, IsIn } from 'class-validator';

export class CreateBacklogItemDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsIn(['Story', 'Bug', 'Task', 'Epic'])
  type: string;

  @IsString()
  @IsOptional()
  @IsIn(['High', 'Medium', 'Low'])
  priority?: string;

  @IsString()
  @IsOptional()
  @IsIn(['To Do', 'In Sprint', 'Done'])
  status?: string;

  @IsNumber()
  @IsOptional()
  points?: number;

  @IsNumber()
  @IsOptional()
  assigneeId?: number;

  @IsNumber()
  @IsOptional()
  sprintId?: number;

  @IsString()
  @IsOptional()
  acceptanceCriteria?: string;

  @IsNumber()
  projectId: number;
}

