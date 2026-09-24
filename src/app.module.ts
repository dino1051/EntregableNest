import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { PacientesModule } from './pacientes/pacientes.module.js';
import { DoctoresModule } from './doctores/doctores.module.js';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';
import { CitasModule } from './citas/citas.module.js';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().min(10).required(),
        PORT: Joi.number().default(3000),
      }),
    }),
    PrismaModule,
    PacientesModule,
    DoctoresModule,
    UsersModule,
    AuthModule,
    CitasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
