import { Controller, Get } from '@nestjs/common';
import { ChapterService } from 'src/services/chapter.service';

@Controller('chapters')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Get()
  findAll() {
    return this.chapterService.findAll();
  }
}