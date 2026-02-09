import {
  IsString,
  IsOptional,
  MinLength,
  IsUrl,
  IsUUID,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCertificationDto {
  @ApiProperty({
    description: 'Titulo de la certificacion',
  })
  @IsString()
  @MinLength(6)
  readonly title: string;
  @ApiProperty({
    description: 'Entidad u organizacion que otorga la certificacion',
    example: 'Microsoft',
  })
  @IsString()
  @MinLength(2)
  readonly issuer: string; // Lo dejamos flexible pero lo validaremos en el DTO
  @ApiProperty()
  @IsDateString()
  readonly issueDate: Date; // En TypeScript usamos el objeto Date para representar DateTime de SQL
  @ApiPropertyOptional({
    description: 'Link de redireccion de validacion de la certificacion',
  })
  @IsUrl({ require_protocol: false })
  @IsString()
  @IsOptional()
  readonly credentialUrl?: string;
  @ApiPropertyOptional({
    description:
      'Si te dan una insignia con tu certificacion, puedes indicar el link aqui',
  })
  @IsUrl({ require_protocol: false })
  @IsString()
  @IsOptional()
  readonly badgeUrl?: string; // Link a la imagen de la insignia (badge)
  @ApiProperty({
    description: 'ID del usuario dueño de esta certificacion',
  })
  @IsUUID()
  @IsString()
  readonly userId: string;
}
