import { Module } from '@nestjs/common';
import { RubricsController } from './rubric.controller';
import { RubricsService } from './rubrics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rubric } from './rubric.entity';

@Module({imports: [
    TypeOrmModule.forFeature([Rubric]),  // 🔥 THIS WAS MISSING
  ],
  controllers: [RubricsController],
  providers: [RubricsService],
})
export class RubricsModule {}
