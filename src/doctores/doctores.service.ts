import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service.js'
import { CreateDoctorDto } from './dto/create-doctor.dto.js';
import { UpdateDoctorDto } from './dto/update-doctor.dto.js';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class DoctoresService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.doctor.findMany()
  }
  async findOne(id_doctor: number) {
    try {
      const user = await this.prisma.doctor.findUnique({
        where: { id_doctor },
      });
      if (!user) {
        throw new NotFoundException(`doctor de ID: ${id_doctor} no encontrado`);
      }
      return user;
    } catch (error) {
      return error;
    }
  }
  async create(CreateDoctorDto: CreateDoctorDto) {
      try {
        return await this.prisma.doctor.create({
          data: CreateDoctorDto,
        });
      } catch (error) {
        return error;
      }
    }
  
    async update(id_doctor: number, UpdateDoctorDto: UpdateDoctorDto) {
      try {
        return await this.prisma.doctor.update({
          where: { id_doctor },
          data: UpdateDoctorDto,
        });
      } catch (error) {
        return error;
      }
    }
  
    async remove(id_doctor: number) {
      try {
        const user = await this.prisma.doctor.findUnique({
          where: { id_doctor },
        });
        if (!user) {
          throw new NotFoundException(`doctor de ID: ${id_doctor} no encontrado`);
        }
        return await this.prisma.doctor.delete({
          where: { id_doctor },
        });
      } catch (error) {
        return error;
      }
    }
}