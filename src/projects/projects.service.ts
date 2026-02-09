import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Technology } from 'src/technologies/entities/technology.entity';
@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Technology)
    private readonly technologyRepository: Repository<Technology>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const { technologies, ...projectData } = createProjectDto;
    const technologiesData = await this.technologyRepository.find({
      where: {
        id: In(technologies),
      },
    });
    if (technologiesData.length !== technologies.length) {
      throw new NotFoundException('Algunas tecnologías no fueron encontradas');
    }
    const newProject = this.projectRepository.create({
      ...projectData,
      technologies: technologiesData,
    });
    return await this.projectRepository.save(newProject);
  }

  async findAll() {
    return await this.projectRepository.find({
      relations: ['technologies'],
    });
  }

  async findOne(slug: string) {
    const project = await this.projectRepository.findOne({
      where: { slug },
      relations: ['technologies'],
    });
    if (!project) {
      throw new NotFoundException(`Proyecto con slug ${slug} no encontrado`);
    }
    return project;
  }

  async update(slug: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.findOne(slug);
    const { technologies, ...dataToUpdate } = updateProjectDto;

    const projectPreload = {
      id: project.id,
      ...dataToUpdate,
    };

    if (technologies) {
      projectPreload['technologies'] = await this.technologyRepository.find({
        where: {
          id: In(technologies),
        },
      });
    }
    const updatedProject = await this.projectRepository.preload(projectPreload);

    if (!updatedProject)
      throw new InternalServerErrorException(
        'Error al procesar la actualización',
      );
    return await this.projectRepository.save(updatedProject);
  }

  async remove(slug: string) {
    const project = await this.findOne(slug);
    await this.projectRepository.remove(project);
    return { deleted: true, message: `Proyecto ${slug} eliminado con éxito` };
  }
}
