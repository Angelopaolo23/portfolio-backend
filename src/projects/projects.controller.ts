import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiParam, ApiBody } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':slug')
  @ApiParam({
    name: 'slug',
    description: 'El slug del proyecto (ej: sistema-televigilancia)',
    example: 'sistema-televigilancia',
  })
  findOne(@Param('slug') slug: string) {
    return this.projectsService.findOne(slug);
  }

  @Patch(':slug')
  @ApiParam({
    name: 'slug',
    description: 'El slug del proyecto (ej: sistema-televigilancia)',
    example: 'sistema-televigilancia',
  })
  @ApiBody({ type: UpdateProjectDto })
  update(
    @Param('slug') slug: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(slug, updateProjectDto);
  }

  @Delete(':slug')
  remove(@Param('slug') slug: string) {
    return this.projectsService.remove(slug);
  }
}
