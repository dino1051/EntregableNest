import { 
    Controller, 
    Get,
    Post,   
    Body,
    Patch,
    Param,
    Delete
} from '@nestjs/common'
import { DoctoresService } from './doctores.service.js'
import { CreateDoctorDto } from './dto/create-doctor.dto.js';
import { UpdateDoctorDto } from './dto/update-doctor.dto.js';


@Controller('doctores')
export class DoctoresController {
  constructor(private readonly doctoresService: DoctoresService) {}

  @Get()
  findAll() {
    return this.doctoresService.findAll()
  }
  

   @Get(':id') //req.params.id
  findOne(@Param('id') id: string) {
    return this.doctoresService.findOne(+id);
  }

  @Post() //req.body
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctoresService.create(createDoctorDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctoresService.update(+id, updateDoctorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctoresService.remove(+id);
  }
}