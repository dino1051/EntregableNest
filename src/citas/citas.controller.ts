import { Controller, Post, Get, Body } from '@nestjs/common';
import { CitasService } from './citas.service.js';
import { CreateCitaDto } from './dto/create-cita.dto.js';
import { UpdateCitaDto } from './dto/update-cita.dto.js';

@Controller('citas')
export class CitasController {
  constructor(private readonly citasService: CitasService) {}

  @Post()
  create(@Body() body: CreateCitaDto) {
    return this.citasService.create(body);
  }

  @Get()
  findAll() {
    return this.citasService.findAll();
  }
}
