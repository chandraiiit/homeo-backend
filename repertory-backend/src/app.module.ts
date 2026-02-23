import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChapterModule } from './modules/chapter.module';
import { RubricModule } from './modules/rubric.module';
import { RemedyModule } from './modules/remedy.module';
import { AnalysisModule } from './modules/analyze.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'homeo',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ChapterModule,
    RubricModule,
    RemedyModule,
    AnalysisModule,
  ],
})
export class AppModule {}