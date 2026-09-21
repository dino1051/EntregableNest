import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { PacientesService } from '../pacientes/pacientes.service.js';
import { UpdateCitaDto } from './dto/update-cita.dto.js';
import { CreateCitaDto } from './dto/create-cita.dto.js';

@Injectable()
export class CitasService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pacientesService: PacientesService,
  ) {}

  async create(data: CreateCitaDto) {
    const paciente = await this.pacientesService.findOne(data.id_paciente);
    if (!paciente) throw new NotFoundException('El paciente no existe');

    return this.prisma.cita.create({ data });
  }

  findAll() {
    return this.prisma.cita.findMany();
  }
}
