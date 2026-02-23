import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Remedy } from '../entities/remedy.entity';
import { RemedyService } from 'src/services/remedy.service';
import { RemedyController } from 'src/controllers/remedy.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Remedy])],
  providers: [RemedyService],
  controllers: [RemedyController],
})
export class RemedyModule {}