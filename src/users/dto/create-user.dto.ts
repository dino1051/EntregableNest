import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Role } from '../../generated/prisma/enums.js';
export class CreateUserDto {
  @IsEmail({}, { message: 'el email debe estar en el formato correcto' })
  @IsNotEmpty({ message: 'el email es obligatorio' })
  @ApiProperty({ example: 'pablo@dominio.com' })
  email: string;
  @IsString({ message: 'password debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'password es obligatorio' })
  @MinLength(6, { message: 'la contraseña debe tener almenos 6 caracteres' })
  @Matches(/\S/, {
    message: 'La contraseña no puede contener solo espacios',
  })
  @ApiProperty({ example: '123456' })
  password: string;
  @IsOptional()
  @IsEnum(Role, { message: 'El rol debe ser RECEPCIONISTA o DOCTOR' })
  @ApiProperty({ example: 'RECEPCIONISTA' })
  role?: Role;
}
