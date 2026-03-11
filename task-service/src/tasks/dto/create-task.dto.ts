import { IsString, IsOptional, IsNumber, IsIn } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @IsIn(['Todo', 'In Progress', 'In Review', 'Done'])
  status?: string;

  @IsString()
  @IsOptional()
  @IsIn(['High', 'Medium', 'Low'])
  priority?: string;

  @IsString()
  @IsOptional()
  dueDate?: string;

  @IsNumber()
  @IsOptional()
  storyPoints?: number;

  @IsNumber()
  @IsOptional()
  assigneeId?: number;

  @IsNumber()
  projectId: number;

  @IsNumber()
  @IsOptional()
  sprintId?: number;

  @IsNumber()
  @IsOptional()
  backlogItemId?: number;
}

