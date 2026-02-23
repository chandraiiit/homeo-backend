import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rubric } from '../entities/rubric.entity';
import { RubricRemedy } from '../entities/rubric-remedy.entity';
import { RubricService } from 'src/services/rubric.service';
import { RubricController } from 'src/controllers/rubric.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Rubric, RubricRemedy])],
  providers: [RubricService],
  controllers: [RubricController],
})
export class RubricModule {}