import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rubric } from '../entities/rubric.entity';
import { PaginationDto } from 'src/dtos/pagination.dto';

@Injectable()
export class RubricService {
  constructor(
    @InjectRepository(Rubric)
    private readonly rubricRepo: Repository<Rubric>,
  ) {}

  async findAll(query: any, pagination: PaginationDto) {
    const { search, chapterId } = query;
    const { page = 1, limit = 20 } = pagination;

    const qb = this.rubricRepo
      .createQueryBuilder('rubric')
      .leftJoinAndSelect('rubric.chapter', 'chapter');

    if (search) {
      qb.andWhere('rubric.description ILIKE :search', {
        search: `%${search}%`,
      });
    }

    if (chapterId) {
      qb.andWhere('chapter.id = :chapterId', { chapterId });
    }

    qb.skip((page - 1) * limit).take(limit);

    const [data, total] = await qb.getManyAndCount();

    return { data, total, page, limit };
  }

  async findOne(id: number) {
    return this.rubricRepo.findOne({
      where: { id },
      relations: {
        chapter: true,
        rubricRemedies: {
          remedy: true,
        },
      },
    });
  }
}