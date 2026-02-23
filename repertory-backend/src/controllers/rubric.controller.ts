import { Controller, Get, Param, Query } from '@nestjs/common';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { RubricService } from 'src/services/rubric.service';

@Controller('rubrics')
export class RubricController {
  constructor(private readonly rubricService: RubricService) {}

  @Get()
  findAll(@Query() query: any, @Query() pagination: PaginationDto) {
    return this.rubricService.findAll(query, pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.rubricService.findOne(Number(id));
  }
}