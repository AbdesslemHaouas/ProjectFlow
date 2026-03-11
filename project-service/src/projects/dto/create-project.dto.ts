import { IsString, IsOptional, IsNumber, IsArray, IsIn } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsIn(['Scrum', 'Kanban'])
  type: string;

  @IsString()
  @IsOptional()
  @IsIn(['Planned', 'Active', 'On Hold', 'Completed'])
  status?: string;

  @IsNumber()
  chefProjetId: number;

  @IsString()
  @IsOptional()
  startDate?: string;

  @IsString()
  @IsOptional()
  endDate?: string;

  @IsArray()
  @IsOptional()
  memberIds?: number[];
}

