import { PartialType } from '@nestjs/mapped-types';
import { CreateSprintDto } from './create-sprint.dto';
import { IsNumber, IsOptional, IsString, IsIn } from 'class-validator';

export class UpdateSprintDto extends PartialType(CreateSprintDto) {
  @IsNumber()
  @IsOptional()
  progress?: number;

  @IsString()
  @IsOptional()
  @IsIn(['Planned', 'Active', 'Completed'])
  status?: string;
}


