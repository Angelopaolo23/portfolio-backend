import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Inyectamos el repo
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async findAll() {
    return await this.userRepository.find({ relations: ['profile'] });
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id }, // Sintaxis corta de { id: id }
      relations: ['profile'],
    });
    if (!user) {
      // NestJS tiene excepciones automáticas que Swagger y el cliente entienden
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id); //para asegurarse que exista el user (es el metodo del service) si falla tira 404
    // 1. Buscamos el usuario y le "cargamos" los cambios del DTO
    // .preload busca por ID y reemplaza los valores que vengan en el DTO
    const updatedUser = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });
    if (!updatedUser)
      throw new InternalServerErrorException(
        'Error al procesar la actualización',
      );
    return await this.userRepository.save(updatedUser);
  }

  async remove(id: string) {
    const user = await this.findOne(id); //Ojo aqui estoy usando el metodo findOne del propio service para reutilizar codigo, es mejor practica, no es el this.userRepository.findOne
    return await this.userRepository.remove(user);
  }
}
