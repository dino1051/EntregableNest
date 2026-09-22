import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { DoctoresService } from './doctores.service.js';
import { CreateDoctorDto } from './dto/create-doctor.dto.js';
import { UpdateDoctorDto } from './dto/update-doctor.dto.js';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('doctores')
export class DoctoresController {
  constructor(private readonly doctoresService: DoctoresService) {}

  @Get('/todos/')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'RECEPCION')
  @ApiBearerAuth()
  findAll() {
    return this.doctoresService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  create(@Body() CreateDoctorDto: CreateDoctorDto) {
    return this.doctoresService.create(CreateDoctorDto);
  }

  @Get('/admin/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.doctoresService.findOne(+id);
  }

  @Get('/doctor/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @ApiBearerAuth()
  findDoc(@Req() req: Request & { user: any }) {
    const id_doctor = req.user.id_doctor;
    return this.doctoresService.findOne(id_doctor);
  }

  @Patch('/admin/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() UpdateDoctorDto: UpdateDoctorDto) {
    return this.doctoresService.update(+id, UpdateDoctorDto);
  }

  @Patch('/doctor/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @ApiBearerAuth()
  updateDoc(
    @Req() req: Request & { user: any },
    @Body() UpdateDoctorDto: UpdateDoctorDto,
  ) {
    const id_doctor = req.user.id_doctor;
    return this.doctoresService.update(id_doctor, UpdateDoctorDto);
  }

  @Delete('/admin/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.doctoresService.remove(+id);
  }
}
