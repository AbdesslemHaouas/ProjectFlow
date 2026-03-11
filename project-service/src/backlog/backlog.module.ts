import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BacklogService } from './backlog.service';
import { BacklogController } from './backlog.controller';
import { BacklogItem } from './entities/backlog-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BacklogItem])],
  controllers: [BacklogController],
  providers: [BacklogService],
  exports: [BacklogService],
})
export class BacklogModule {}


