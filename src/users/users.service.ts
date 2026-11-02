import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import bcrypt from 'bcryptjs';
import { Role } from '../generated/prisma/client.js';
import { UpdateProfileDto } from './dto/update-profie.dto.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return this.prisma.user.create({
      data: {
        nombre: createUserDto.nombre,
        email: createUserDto.email,
        password: hashedPassword,
        role: createUserDto.role ?? Role.RECEPCION,
      },
      select: {
        id: true,
        nombre: true,
        email: true,
        role: true,
        creadoEn: true,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      orderBy: { id: 'asc' },
      select: {
        id: true,
        nombre: true,
        email: true,
        role: true,
        id_doctor: true,
        creadoEn: true,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        role: true,
        creadoEn: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`usuario de ID: ${id} no encontrado`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundException(`Usuario de ID: ${id} no encontrado`);
    }

    const { password, ...datosUsuario } = updateUserDto;

    return this.prisma.user.update({
      where: { id },
      data: {
        ...datosUsuario,
        ...(password && {
          password: await bcrypt.hash(password, 10),
        }),
      },
      select: {
        id: true,
        nombre: true,
        email: true,
        role: true,
        id_doctor: true,
        creadoEn: true,
      },
    });
  }

  async remove(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundException(`Usuario de ID: ${id} no encontrado`);
    }

    return this.prisma.user.delete({
      where: { id },
      select: {
        id: true,
        nombre: true,
        email: true,
        role: true,
      },
    });
  }

  async findProfileById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        nombre: true,
        email: true,
        role: true,
        fotoUrl: true,
        creadoEn: true,
        doctor: {
          select: {
            id_doctor: true,
            nombre: true,
            apellido: true,
            especialidad: true,
            telefono: true,
            email: true,
            activo: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        nombre: true,
        email: true,
        role: true,
        password: true,
      },
    });
  }

  async updateProfile(id: number, dto: UpdateProfileDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    await this.prisma.user.update({
      where: { id },
      data: {
        ...(dto.nombre !== undefined && {
          nombre: dto.nombre,
        }),
        ...(dto.fotoUrl !== undefined && {
          fotoUrl: dto.fotoUrl,
        }),
      },
    });

    return this.findProfileById(id);
  }
  async assignDoctor(id: number, id_doctor: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const doctor = await this.prisma.doctor.findUnique({
      where: { id_doctor },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor no encontrado');
    }

    const doctorAssigned = await this.prisma.user.findUnique({
      where: { id_doctor },
    });

    if (doctorAssigned && doctorAssigned.id !== id) {
      throw new ConflictException(
        'Este doctor ya está asignado a otro usuario',
      );
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        id_doctor,
      },
      select: {
        id: true,
        nombre: true,
        email: true,
        role: true,
        id_doctor: true,
        doctor: {
          select: {
            id_doctor: true,
            nombre: true,
            apellido: true,
            especialidad: true,
          },
        },
      },
    });
  }
}
