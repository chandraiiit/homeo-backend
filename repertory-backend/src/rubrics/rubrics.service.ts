


import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RubricRemedy } from "src/entities/rubric-remedy.entity";
import { Repository } from "typeorm";
import { Rubric } from "./rubric.entity";

@Injectable()
export class RubricsService {
  constructor(
     @InjectRepository(Rubric)
    private rubricRepo: Repository<Rubric>,
  ) {}

  async search(query: string) {
  return this.rubricRepo
    .createQueryBuilder('rubric')
    .where('LOWER(rubric.title) LIKE LOWER(:q)', {
      q: `%${query}%`,
    })
    .limit(20)
    .getMany();
}

}