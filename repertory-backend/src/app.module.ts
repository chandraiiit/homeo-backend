import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CasesModule } from './cases/cases.module';
import { RubricsModule } from './rubrics/rubrics.module';
import { RemediesModule } from './remedies/remedies.module';
import { RepertorizationModule } from './repertorization/repertorization.module';
import { Rubric } from './rubrics/rubric.entity';
import { RubricRemedy } from './entities/rubric-remedy.entity';

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
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    UsersModule,
    AuthModule,
    CasesModule,
    RubricsModule,
    RemediesModule,
    RepertorizationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
