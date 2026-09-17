import { NotFoundException, Injectable } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto.js';
import { UpdatePacienteDto } from './dto/update-paciente.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class PacientesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.paciente.findMany({
      orderBy: { id_paciente: 'asc' },
    });
  }

  async findOne(id_paciente: number) {
    const user = await this.prisma.paciente.findUnique({
      where: { id_paciente },
    });
    if (!user) {
      throw new NotFoundException(
        `paciente de ID: ${id_paciente} no encontrado`,
      );
    }
    return user;
  }
  async create(CreatePacienteDto: CreatePacienteDto) {
    return await this.prisma.paciente.create({
      data: CreatePacienteDto,
    });
  }

  async update(id_paciente: number, UpdatePacienteDto: UpdatePacienteDto) {
    return await this.prisma.paciente.update({
      where: { id_paciente },
      data: UpdatePacienteDto,
    });
  }

  async remove(id_paciente: number) {
    const user = await this.prisma.paciente.findUnique({
      where: { id_paciente },
    });
    if (!user) {
      throw new NotFoundException(
        `paciente de ID: ${id_paciente} no encontrado`,
      );
    }
    return await this.prisma.paciente.delete({
      where: { id_paciente },
    });
  }
}
