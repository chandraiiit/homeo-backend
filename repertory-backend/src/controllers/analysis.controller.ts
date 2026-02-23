import { Body, Controller, Post } from '@nestjs/common';
import { AnalyzeDto } from 'src/dtos/analysis.dto';
import { AnalysisService } from 'src/services/analysis.service';


@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Post()
  analyze(@Body() dto: AnalyzeDto) {
    return this.analysisService.analyze(dto.rubricIds);
  }
}