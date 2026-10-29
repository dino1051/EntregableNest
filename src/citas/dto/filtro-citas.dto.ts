import { IsEnum, IsOptional } from 'class-validator';
import { estados } from '../../generated/prisma/client.js';

export class FiltroCitasDto {
  @IsOptional()
  @IsEnum(estados)
  estado?: estados;
}