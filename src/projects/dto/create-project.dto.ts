import {
  IsString,
  IsBoolean,
  IsOptional,
  IsArray,
  MaxLength,
  MinLength,
  IsUUID,
  IsUrl,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateProjectDto {
  @ApiProperty({
    description: 'Titulo de proyecto',
  })
  @MaxLength(30)
  @MinLength(10)
  @IsString()
  readonly title: string;
  @ApiProperty({
    description:
      'Slug del proyecto, sirve para referenciar en la URL al proyecto, es como un ID pero de texto',
    example: 'sistema-televigilancia',
  })
  @IsString()
  @MaxLength(20)
  @MinLength(6)
  readonly slug: string;
  @ApiProperty({
    description: 'Descripcion corta',
  })
  @MaxLength(100)
  @MinLength(20)
  @IsString()
  readonly shortDesc: string;
  @ApiPropertyOptional({
    description: 'Descripcion de la arquitectura',
  })
  @MaxLength(100)
  @MinLength(20)
  @IsString()
  @IsOptional()
  readonly archDesc?: string;
  @ApiPropertyOptional({
    description: 'Descripcion de AI',
  })
  @MaxLength(100)
  @MinLength(20)
  @IsString()
  @IsOptional()
  readonly aiDesc?: string;
  @ApiPropertyOptional({
    description: 'URL del proyecto desplegado',
  })
  @IsString()
  @IsOptional()
  @IsUrl({ require_protocol: false })
  readonly deployUrl?: string;
  @ApiPropertyOptional({
    description: 'URL del repositorio del proyecto',
  })
  @IsString()
  @IsOptional()
  @IsUrl({ require_protocol: false })
  readonly repoUrl?: string;
  @ApiProperty({
    description: 'Imagen principal del proyecto',
  })
  @IsString()
  readonly mainImage: string;
  @ApiProperty({
    type: [String],
    description: 'Galería de imagenes de cada proyecto',
  })
  @IsArray()
  @IsString({ each: true })
  readonly gallery: string[];
  @ApiPropertyOptional({
    description: '¿Es un proyecto destacado?',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  readonly isFeatured?: boolean = false;
  @ApiProperty({
    type: [String],
    example: ['uuid-tecnologia-1', 'uuid-tecnologia-2'],
    description: 'Listado de tecnologias del proyecto',
  })
  @IsArray()
  @IsUUID('all', { each: true })
  readonly technologies: string[];
}
