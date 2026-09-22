import {
  IsNotEmpty,
  Matches,
  IsOptional,
  IsDate,
  IsIn,
  IsInt,
  IsPositive,
  IsEnum,
} from 'class-validator';
import { estados } from '../../generated/prisma/enums.js';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCitaDto {
  @IsDate({ message: 'fecha debe estar en formato YYYY-MM-DD' })
  @IsNotEmpty({ message: 'el apellido es obligatorio' })
  @Matches(/\S/, {
    message: 'La fecha no puede contener solo espacios',
  })
  @ApiProperty({ example: '2026-10-21' })
  fecha: Date;
  @IsEnum(estados)
  @IsOptional()
  @ApiProperty({ example: 'PROGRAMADA' })
  estado?: estados;
  @IsInt({ message: 'El Id_paciente debe ser un numero entero' })
  @IsPositive({ message: 'El Id_paciente debe ser un numero positivo' })
  @Matches(/\S/, {
    message: 'El Id_paciente no puede contener solo espacios',
  })
  @IsNotEmpty({ message: 'el id_paciente es obligatorio' })
  @ApiProperty({ example: 3 })
  id_paciente: number;
  @IsInt({ message: 'El Id_doctor debe ser un numero entero' })
  @IsPositive({ message: 'El Id_doctor debe ser un numero positivo' })
  @Matches(/\S/, {
    message: 'el id_doctor no puede contener solo espacios',
  })
  @IsNotEmpty({ message: 'el id_paciente es obligatorio' })
  @ApiProperty({ example: 4 })
  id_doctor: number;
}
