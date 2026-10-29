
import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";
import bcrypt from "bcrypt";
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("No se encontró la variable DATABASE_URL.");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Iniciando seed de pacientes, doctores y citas...");

  // --------------------------------------------------
  // 1. PACIENTES
  // --------------------------------------------------

  const pacientesDatos = [
    {
      nombre: "Ana",
      apellido: "López",
      email: "ana.lopez.seed@example.com",
      telefono: "5512345678",
      fechaNacimiento: new Date("1995-03-15T12:00:00.000Z"),
    },
    {
      nombre: "Carlos",
      apellido: "Ramírez",
      email: "carlos.ramirez.seed@example.com",
      telefono: "5523456789",
      fechaNacimiento: new Date("1988-07-22T12:00:00.000Z"),
    },
    {
      nombre: "María",
      apellido: "Torres",
      email: "maria.torres.seed@example.com",
      telefono: "5534567890",
      fechaNacimiento: new Date("2000-01-10T12:00:00.000Z"),
    },
    {
      nombre: "Luis",
      apellido: "Hernández",
      email: "luis.hernandez.seed@example.com",
      telefono: "5545678901",
      fechaNacimiento: new Date("1979-11-05T12:00:00.000Z"),
    },
    {
      nombre: "Sofía",
      apellido: "Martínez",
      email: "sofia.martinez.seed@example.com",
      telefono: "5556789012",
      fechaNacimiento: new Date("1992-09-18T12:00:00.000Z"),
    },
    {
      nombre: "Diego",
      apellido: "Flores",
      email: "diego.flores.seed@example.com",
      telefono: "5567890123",
      fechaNacimiento: new Date("2003-05-27T12:00:00.000Z"),
    },
  ];

  const pacientes = [];

  for (const datos of pacientesDatos) {
    const paciente = await prisma.paciente.upsert({
      where: {
        email: datos.email,
      },
      update: {
        nombre: datos.nombre,
        apellido: datos.apellido,
        telefono: datos.telefono,
        fechaNacimiento: datos.fechaNacimiento,
      },
      create: datos,
    });

    pacientes.push(paciente);
  }

  console.log(`✅ Pacientes: ${pacientes.length}`);

  // --------------------------------------------------
  // 2. DOCTORES
  // --------------------------------------------------

  const doctoresDatos = [
    {
      nombre: "Carlos",
      apellido: "García",
      especialidad: "Medicina general",
      telefono: "5581234567",
      email: "carlos.garcia.seed@example.com",
    },
    {
      nombre: "Laura",
      apellido: "Pérez",
      especialidad: "Pediatría",
      telefono: "5582345678",
      email: "laura.perez.seed@example.com",
    },
    {
      nombre: "Roberto",
      apellido: "Sánchez",
      especialidad: "Cardiología",
      telefono: "5583456789",
      email: "roberto.sanchez.seed@example.com",
    },
  ];

  const doctores = [];

  for (const datos of doctoresDatos) {
    const doctor = await prisma.doctor.upsert({
      where: {
        email: datos.email,
      },
      update: {
        nombre: datos.nombre,
        apellido: datos.apellido,
        especialidad: datos.especialidad,
        telefono: datos.telefono,
      },
      create: datos,
    });

    doctores.push(doctor);
  }

  console.log(`✅ Doctores: ${doctores.length}`);

  // --------------------------------------------------
// 3. USUARIOS
// --------------------------------------------------

const usuariosDatos = [
  {
    email: "admin.seed@example.com",
    password: "Admin123!",
    role: "ADMIN",
  },
  {
    email: "doctor.seed@example.com",
    password: "Doctor123!",
    role: "DOCTOR",
  },
  {
    email: "recepcion.seed@example.com",
    password: "Recepcion123!",
    role: "RECEPCION",
  },
] as const;

for (const datos of usuariosDatos) {
  const passwordHash = await bcrypt.hash(datos.password, 10);

  await prisma.user.upsert({
    where: {
      email: datos.email,
    },
    update: {
      password: passwordHash,
      role: datos.role,
    },
    create: {
      email: datos.email,
      password: passwordHash,
      role: datos.role,
    },
  });
}
  // --------------------------------------------------
  // 3. CITAS
  // --------------------------------------------------

  const estadosCita = [
    "PROGRAMADA",
    "COMPLETADA",
    "CANCELADA",
  ] as const;

  let citasCreadas = 0;
  let citasExistentes = 0;

  for (let i = 0; i < 24; i++) {
    const paciente = pacientes[i % pacientes.length];
    const doctor = doctores[i % doctores.length];

    // Fechas fijas para que el seed sea repetible.
    // Las fechas abarcan del 20 de octubre al 12 de noviembre de 2026.
    const fecha = new Date(
      Date.UTC(
        2026,
        9,
        20 + i,
        9 + (i % 8),
        0,
        0,
      ),
    );

    const estado = estadosCita[i % estadosCita.length];

    // Cita no tiene una restricción única compuesta.
    // Buscamos la cita antes de crearla para evitar duplicados
    // al ejecutar nuevamente el seed.
    const citaExistente = await prisma.cita.findFirst({
      where: {
        id_paciente: paciente.id_paciente,
        id_doctor: doctor.id_doctor,
        fecha,
      },
    });

    if (citaExistente) {
      citasExistentes++;
      continue;
    }

    await prisma.cita.create({
      data: {
        fecha,
        estado,
        id_paciente: paciente.id_paciente,
        id_doctor: doctor.id_doctor,
      },
    });

    citasCreadas++;
  }

  console.log(`✅ Citas nuevas: ${citasCreadas}`);
  console.log(`ℹ️ Citas que ya existían: ${citasExistentes}`);
  console.log("🎉 Seed completado correctamente.");
}

main()
  .catch((error) => {
    console.error("❌ Error ejecutando el seed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
