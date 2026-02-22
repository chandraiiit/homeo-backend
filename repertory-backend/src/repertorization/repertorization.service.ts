import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RubricRemedy } from "src/entities/rubric-remedy.entity";
import { RepertorizationResult } from "src/types/repertorization.types";
import { Repository } from "typeorm";

@Injectable()
export class RepertorizationService {
  constructor(
    @InjectRepository(RubricRemedy)
    private mappingRepo: Repository<RubricRemedy>,
  ) {}

  async analyze(rubricIds: number[]) {
  const mappings = await this.mappingRepo
    .createQueryBuilder('mapping')
    .leftJoinAndSelect('mapping.remedy', 'remedy')
    .where('mapping.rubricId IN (:...rubricIds)', { rubricIds })
    .getMany();

  const scoreMap = new Map<number, { score: number; name: string }>();
  const coverageMap = new Map<number, number>();

  for (const m of mappings) {
    const remedyId = m.remedy.id;
    const remedyName = m.remedy.name; // Assuming remedy has a 'name' property

    scoreMap.set(
      remedyId,
      {
        score: (scoreMap.get(remedyId)?.score || 0) + m.grade,
        name: remedyName,
      }
    );

    coverageMap.set(
      remedyId,
      (coverageMap.get(remedyId) || 0) + 1
    );
  }

  const results: RepertorizationResult[] = [];

  for (const [remedyId, { score, name }] of scoreMap.entries()) {
    results.push({
      remedyId,
      name, // Include remedy name in the result
      score,
      covered: coverageMap.get(remedyId) || 0,
    });
  }

  return results.sort((a, b) => b.score - a.score);
}
}