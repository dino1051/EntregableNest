import { Controller, Post, Get, Body } from '@nestjs/common';
import { CitasService } from './citas.service.js';
import { CreateCitaDto } from './dto/create-cita.dto.js';
import { UpdateCitaDto } from './dto/update-cita.dto.js';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Citas')
@Controller('citas')
export class CitasController {
  constructor(private readonly citasService: CitasService) {}
  @ApiOperation({ summary: 'Crea una nueva cita' })
  @Post()
  create(@Body() body: CreateCitaDto) {
    return this.citasService.create(body);
  }
  @ApiOperation({ summary: 'Lista todas las citas' })
  @Get()
  findAll() {
    return this.citasService.findAll();
  }
}
