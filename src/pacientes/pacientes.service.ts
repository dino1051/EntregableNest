import { NotFoundException, Injectable } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto.js';
import { UpdatePacienteDto } from './dto/update-paciente.dto.js';
import { PrismaService } from '../prisma/prisma.service.js'
import { NotFoundException } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto.js';
import { UpdatePacienteDto } from './dto/update-paciente.dto.js';

@Injectable()
export class PacientesService {
  constructor(private readonly prisma: PrismaService) {}

    async findAll() {
        return this.prisma.paciente.findMany()
    }

    async create(createPacienteDto: CreatePacienteDto) {
        try {
        return await this.prisma.paciente.create({
            data: createPacienteDto,
        });
        } catch (error) {
        return error;
        }
    }
    async findOne(id_paciente: number) {
    try {
      const user = await this.prisma.paciente.findUnique({
        where: { id_paciente },
      });
      if (!user) {
        throw new NotFoundException(`producto de ID: ${id_paciente} no encontrado`);
      }
      return user;
    } catch (error) {
      return error;
    }
  }

  async update(id_paciente: number, UpdatePacienteDto: UpdatePacienteDto) {
    try {
      return await this.prisma.paciente.update({
        where: { id_paciente },
        data: UpdatePacienteDto,
      });
    } catch (error) {
      return error;
    }
  }

  async remove(id_paciente: number) {
    try {
      const user = await this.prisma.paciente.findUnique({
        where: { id_paciente },
      });
      if (!user) {
        throw new NotFoundException(`producto de ID: ${id_paciente} no encontrado`);
      }
      return await this.prisma.paciente.delete({
        where: { id_paciente },
      });
    } catch (error) {
      return error;
    }
  }
  async findOne(id_paciente: number) {
    try {
      const user = await this.prisma.paciente.findUnique({
        where: { id_paciente },
      });
      if (!user) {
        throw new NotFoundException(`paciente de ID: ${id_paciente} no encontrado`);
      }
      return user;
    } catch (error) {
      return error;
    }
  }
  async create(CreatePacienteDto: CreatePacienteDto) {
    try {
      return await this.prisma.paciente.create({
        data: CreatePacienteDto,
      });
    } catch (error) {
      return error;
    }
  }

  async update(id_paciente: number, UpdatePacienteDto: UpdatePacienteDto) {
    try {
      return await this.prisma.paciente.update({
        where: { id_paciente },
        data: UpdatePacienteDto,
      });
    } catch (error) {
      return error;
    }
  }

  async remove(id_paciente: number) {
    try {
      const user = await this.prisma.paciente.findUnique({
        where: { id_paciente },
      });
      if (!user) {
        throw new NotFoundException(`paciente de ID: ${id_paciente} no encontrado`);
      }
      return await this.prisma.paciente.delete({
        where: { id_paciente },
      });
    } catch (error) {
      return error;
    }
  }
}