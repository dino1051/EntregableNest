import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
  IsOptional,
  IsEnum,
  MaxLength,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Role } from '../../generated/prisma/enums.js';

export class CreateUserDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsOptional()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @Matches(/\S/, {
    message: 'El nombre no puede contener solo espacios',
  })
  @MaxLength(100)
  @ApiPropertyOptional({ example: 'Juan Perez' })
  nombre?: string;

  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  @ApiProperty({ example: 'pablo@dominio.com' })
  email!: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(6, {
    message: 'La contraseña debe tener al menos 6 caracteres',
  })
  @Matches(/\S/, {
    message: 'La contraseña no puede contener solo espacios',
  })
  @ApiProperty({ example: '123456' })
  password!: string;

  @IsOptional()
  @IsEnum(Role, {
    message: 'El rol debe ser RECEPCION, DOCTOR o ADMIN',
  })
  @ApiPropertyOptional({ example: 'RECEPCION' })
  role?: Role;
}
