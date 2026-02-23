import { ArrayNotEmpty, IsArray, IsInt } from 'class-validator';

export class AnalyzeDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  rubricIds: number[];
}