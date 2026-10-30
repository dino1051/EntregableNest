import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/roles.decorator.js';
import type { AuthUser } from '../auth/interfaces/auth-user.interface.js';
import { UpdateProfileDto } from './dto/update-profie.dto.js';
import { AssignDoctorDto } from './dto/assign-doctor.dto.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  //@UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles('ADMIN')
  @ApiBearerAuth()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  updateProfile(@CurrentUser() user: AuthUser, @Body() dto: UpdateProfileDto) {
    if (dto.nombre === undefined && dto.fotoUrl === undefined) {
      throw new BadRequestException(
        'Debes proporcionar al menos un campo para actualizar',
      );
    }
    return this.usersService.updateProfile(user.id, dto);
  }

  @Get(':id')
  //@UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles('ADMIN')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  //@UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles('ADMIN')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  //@UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles('ADMIN')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
  @Patch(':id/doctor')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  assignDoctor(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AssignDoctorDto,
  ) {
    return this.usersService.assignDoctor(id, dto.id_doctor);
  }
}
