import { IsString, IsOptional, IsNumber, IsIn } from 'class-validator';

export class CreateSprintDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  goal?: string;

  @IsNumber()
  projectId: number;

  @IsString()
  @IsOptional()
  startDate?: string;

  @IsString()
  @IsOptional()
  endDate?: string;
}

