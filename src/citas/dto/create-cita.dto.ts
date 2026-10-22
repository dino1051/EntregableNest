import {
  IsNotEmpty,
  IsOptional,
  IsDate,
  IsInt,
  IsPositive,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { estados } from '../../generated/prisma/enums.js';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCitaDto {
  @Type(() => Date)
  @IsDate({ message: 'La fecha debe ser una fecha válida' })
  @ApiProperty({
    example: '2026-10-25T15:30:00.000Z',
    description: 'Fecha y hora de la cita en formato ISO 8601',
  })
  fecha: Date;

  @IsEnum(estados, { message: 'El estado de la cita no es válido' })
  @IsOptional()
  @ApiPropertyOptional({ example: 'PROGRAMADA' })
  estado?: estados;

  @Type(() => Number)
  @IsInt({ message: 'El id_paciente debe ser un número entero' })
  @IsPositive({ message: 'El id_paciente debe ser un número positivo' })
  @IsNotEmpty({ message: 'El id_paciente es obligatorio' })
  @ApiProperty({ example: 3 })
  id_paciente: number;

  @Type(() => Number)
  @IsInt({ message: 'El id_doctor debe ser un número entero' })
  @IsPositive({ message: 'El id_doctor debe ser un número positivo' })
  @IsNotEmpty({ message: 'El id_doctor es obligatorio' })
  @ApiProperty({ example: 4 })
  id_doctor: number;
}
