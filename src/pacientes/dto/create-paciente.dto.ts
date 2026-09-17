import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePacienteDto {
  @IsString({ message: 'el nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'el nombre es obligatorio' })
  @MinLength(2, { message: 'El nombre debe tener almenos 2 caracteres' })
  @Matches(/\S/, {
    message: 'El nombre  no puede contener solo espacios',
  })
  nombre: string;
  @IsString({ message: 'el apellido debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'el apellido es obligatorio' })
  @MinLength(2, { message: 'El apellido debe tener almenos 2 caracteres' })
  @Matches(/\S/, {
    message: 'El apellido  no puede contener solo espacios',
  })
  apellido: string;
  @IsEmail()
  @IsNotEmpty({ message: 'el email es obligatorio' })
  email: string;
  @IsString({ message: 'el telefono debe ser una cadena de texto' })
  @MinLength(2, { message: 'el telefono debe tener almenos 2 caracteres' })
  @Matches(/\S/, {
    message: 'el telefono  no puede contener solo espacios',
  })
  telefono: string;
  @Matches(/\S/, {
    message: 'la fecha de nacimiento  no puede contener solo espacios',
  })
  fechaNacimiento: Date;
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
