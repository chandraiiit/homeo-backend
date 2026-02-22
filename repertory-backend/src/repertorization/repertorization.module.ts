import { Module } from '@nestjs/common';
import { RepertorizationController } from './repertorization.controller';
import { RepertorizationService } from './repertorization.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RubricRemedy } from 'src/entities/rubric-remedy.entity';

@Module({
    imports: [
    TypeOrmModule.forFeature([RubricRemedy]),
  ],
  controllers: [RepertorizationController],
  providers: [RepertorizationService],
})
export class RepertorizationModule {}
