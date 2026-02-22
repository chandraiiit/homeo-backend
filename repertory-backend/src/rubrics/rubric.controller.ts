import {
  Controller,
  Get,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { RubricsService } from './rubrics.service';

@Controller('rubrics')
export class RubricsController {
  constructor(private readonly rubricsService: RubricsService) {}

  // GET /rubrics/search?q=head
  @Get('search')
  async search(@Query('q') query: string) {
    if (!query || query.trim().length === 0) {
      throw new BadRequestException('Search query cannot be empty');
    }

    return this.rubricsService.search(query);
  }
}