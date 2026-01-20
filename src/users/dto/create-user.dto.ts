import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  @IsEmail({}, { message: 'El formato del correo electrónico no es válido' })
  email: string;
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(20, {
    message: 'La contraseña no puede exceder los 20 caracteres',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'La contraseña es demasiado débil. Debe incluir mayúsculas y números.',
  })
  password: string;
}
