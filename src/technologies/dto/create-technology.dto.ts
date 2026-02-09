import {
  IsString,
  IsOptional,
  MinLength,
  IsEnum,
  IsUrl,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TechCategory } from '../entities/technology.entity';
export class CreateTechnologyDto {
  @ApiProperty({ example: 'NestJS', description: 'Nombre de la herramienta' })
  @IsString()
  @MinLength(2)
  readonly name: string;
  @ApiProperty({
    enum: TechCategory,
    description: 'Categoría de la tecnología',
    example: 'frontend',
  })
  @IsEnum(TechCategory)
  readonly category: TechCategory;
  @ApiPropertyOptional({
    example: 'https://cdn.worldvectorlogo.com/logos/nestjs.svg',
  })
  @IsUrl({ require_protocol: false })
  @IsString()
  @IsOptional()
  readonly iconUrl?: string;
}
