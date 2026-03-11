import { PartialType } from '@nestjs/mapped-types';
import { CreateBacklogItemDto } from './create-backlog-item.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateBacklogItemDto extends PartialType(CreateBacklogItemDto) {
  @IsNumber()
  @IsOptional()
  order?: number;
}


