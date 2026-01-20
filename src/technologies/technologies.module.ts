import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Technology } from './entities/technology.entity';
import { TechnologiesService } from './technologies.service';
import { TechnologiesController } from './technologies.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Technology])], // Esto registra la entidad en este módulo
  controllers: [TechnologiesController],
  providers: [TechnologiesService],
})
export class TechnologiesModule {}
