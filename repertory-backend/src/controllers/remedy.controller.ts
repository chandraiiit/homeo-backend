import { Controller, Get, Param, Query } from '@nestjs/common';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { RemedyService } from 'src/services/remedy.service';

@Controller('remedies')
export class RemedyController {
  constructor(private readonly remedyService: RemedyService) {}

  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.remedyService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.remedyService.findOne(Number(id));
  }
}