import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Project])], // Esto registra la entidad en este módulo
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
