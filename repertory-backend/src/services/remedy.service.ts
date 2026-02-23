import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Remedy } from '../entities/remedy.entity';
import { PaginationDto } from 'src/dtos/pagination.dto';

@Injectable()
export class RemedyService {
  constructor(
    @InjectRepository(Remedy)
    private readonly remedyRepo: Repository<Remedy>,
  ) {}

  async findAll(pagination: PaginationDto) {
    const { page = 1, limit = 20 } = pagination;

    const [data, total] = await this.remedyRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { name: 'ASC' },
    });

    return { data, total, page, limit };
  }

  async findOne(id: number) {
    const remedy = await this.remedyRepo.findOne({
      where: { id },
      relations: {
        rubricRemedies: {
          rubric: true,
        },
      },
    });
    if (!remedy) {
        throw new NotFoundException(`Remedy with id ${id} not found`);
    }

    return {
      id: remedy.id,
      name: remedy.name,
      rubricCount: remedy.rubricRemedies.length,
    };
  }
}