import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RubricRemedy } from '../entities/rubric-remedy.entity';
import { Remedy } from '../entities/remedy.entity';
import { AnalysisService } from 'src/services/analysis.service';
import { AnalysisController } from 'src/controllers/analysis.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RubricRemedy, Remedy])],
  providers: [AnalysisService],
  controllers: [AnalysisController],
})
export class AnalysisModule {}