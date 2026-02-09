import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
//DTOs
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';
//TYPEORM
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
//ENTITY
import { Technology } from './entities/technology.entity';

@Injectable()
export class TechnologiesService {
  constructor(
    @InjectRepository(Technology)
    private readonly technologyRepository: Repository<Technology>,
  ) {}

  async create(createTechnologyDto: CreateTechnologyDto) {
    const newTechnology = this.technologyRepository.create(createTechnologyDto);
    return await this.technologyRepository.save(newTechnology);
  }

  async findAll() {
    return await this.technologyRepository.find();
  }

  async findOne(id: string) {
    const technology = await this.technologyRepository.findOne({
      where: { id },
      relations: ['projects'],
    });
    if (!technology) {
      throw new NotFoundException(`Tecnología con ID ${id} no encontrada`);
    }
    return technology;
  }

  async update(id: string, updateTechnologyDto: UpdateTechnologyDto) {
    await this.findOne(id);
    const updatedTechnology = await this.technologyRepository.preload({
      id: id,
      ...updateTechnologyDto,
    });
    if (!updatedTechnology)
      throw new InternalServerErrorException(
        'Error al procesar la actualización',
      );
    return await this.technologyRepository.save(updatedTechnology);
  }

  async remove(id: string) {
    const technology = await this.findOne(id);
    return await this.technologyRepository.remove(technology);
  }
}
