import {
  IsNotEmpty,
  Matches,
  IsOptional,
  IsDate,
  IsIn,
  IsInt,
  IsPositive,
} from 'class-validator';
import { estados } from '../../generated/prisma/enums.js';

export class CreateCitaDto {
  @IsDate({ message: 'fecha debe estar en formato YYYY-MM-DD' })
  @IsNotEmpty({ message: 'el apellido es obligatorio' })
  @Matches(/\S/, {
    message: 'La fecha no puede contener solo espacios',
  })
  fecha: Date;
  @IsIn(['PROGRAMADA', 'COMPLETADA', 'CANCELADA'], {
    message: "El estado debe ser 'PROGRAMADA','COMPLETADA' o 'CANCELADA'",
  })
  @IsOptional()
  estado?: estados;
  @IsInt({ message: 'El Id_paciente debe ser un numero entero' })
  @IsPositive({ message: 'El Id_paciente debe ser un numero positivo' })
  @Matches(/\S/, {
    message: 'El Id_paciente no puede contener solo espacios',
  })
  @IsNotEmpty({ message: 'el id_paciente es obligatorio' })
  id_paciente: number;
  @IsInt({ message: 'El Id_doctor debe ser un numero entero' })
  @IsPositive({ message: 'El Id_doctor debe ser un numero positivo' })
  @Matches(/\S/, {
    message: 'el id_doctor no puede contener solo espacios',
  })
  @IsNotEmpty({ message: 'el id_paciente es obligatorio' })
  id_doctor: number;
}
