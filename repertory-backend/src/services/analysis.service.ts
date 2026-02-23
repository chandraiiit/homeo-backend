import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RubricRemedy } from '../entities/rubric-remedy.entity';
import { Remedy } from '../entities/remedy.entity';

@Injectable()
export class AnalysisService {
  constructor(
    @InjectRepository(RubricRemedy)
    private readonly rubricRemedyRepo: Repository<RubricRemedy>,

    @InjectRepository(Remedy)
    private readonly remedyRepo: Repository<Remedy>,
  ) {}

  async analyze(rubricIds: number[]) {
    if (!rubricIds || rubricIds.length === 0) {
      throw new BadRequestException('rubricIds cannot be empty');
    }

    const uniqueIds = [...new Set(rubricIds)];

    const results = await this.rubricRemedyRepo
      .createQueryBuilder('rr')
      .innerJoin('rr.remedy', 'remedy')
      .select('remedy.id', 'remedyId')
      .addSelect('remedy.name', 'remedy')
      .addSelect('SUM(rr.grade)', 'totalScore')
      .addSelect('COUNT(rr.rubric)', 'matchedRubrics')
      .where('rr.rubric_id IN (:...rubricIds)', { rubricIds: uniqueIds })
      .groupBy('remedy.id')
      .addGroupBy('remedy.name')
      .orderBy('totalScore', 'DESC')
      .addOrderBy('matchedRubrics', 'DESC')
      .getRawMany();

    const totalSelected = uniqueIds.length;

    const formatted = results.map((r) => ({
      remedyId: Number(r.remedyId),
      remedy: r.remedy,
      totalScore: Number(r.totalScore),
      matchedRubrics: Number(r.matchedRubrics),
      confidence: Number(
        ((Number(r.matchedRubrics) / totalSelected) * 100).toFixed(2),
      ),
    }));

    return {
      selectedRubrics: totalSelected,
      results: formatted,
    };
  }
}