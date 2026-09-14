import { Controller, Get } from '@nestjs/common'
import { DoctoresService } from './doctores.service.js'

@Controller('pacientes')
export class DoctoresController {
  constructor(private readonly doctoresService: DoctoresService) {}

  @Get()
  findAll() {
    return this.doctoresService.findAll()
  }
}