import {
  Controller,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { RepertorizationService } from './repertorization.service';
import { RepertorizationResult } from 'src/types/repertorization.types';

@Controller('repertorization')
export class RepertorizationController {
  constructor(
    private readonly repertorizationService: RepertorizationService,
  ) {}

  @Post('analyze')
async analyze(rubricIds: number[]): Promise<RepertorizationResult[]> {
    if (!rubricIds || rubricIds.length === 0) {
      throw new BadRequestException(
        'At least one rubricId must be provided',
      );
    }

    return this.repertorizationService.analyze(rubricIds);
  }
}