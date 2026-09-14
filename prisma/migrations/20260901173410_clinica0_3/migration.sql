-- CreateEnum
CREATE TYPE "estados" AS ENUM ('PROGRAMADA', 'COMPLETADA', 'CANCELADA');

-- CreateTable
CREATE TABLE "Paciente" (
    "id_paciente" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("id_paciente")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "id_doctor" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "especialidad" TEXT NOT NULL,
    "telefono" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id_doctor")
);

-- CreateTable
CREATE TABLE "Cita" (
    "id_cita" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "estado" "estados" NOT NULL DEFAULT 'PROGRAMADA',
    "id_paciente" INTEGER NOT NULL,
    "id_doctor" INTEGER NOT NULL,

    CONSTRAINT "Cita_pkey" PRIMARY KEY ("id_cita")
);

-- CreateTable
CREATE TABLE "ConsultasMedicas" (
    "id_consulta_medica" SERIAL NOT NULL,
    "id_cita" INTEGER NOT NULL,
    "diagnostico" TEXT,
    "tratamiento" TEXT,
    "observaciones" TEXT,

    CONSTRAINT "ConsultasMedicas_pkey" PRIMARY KEY ("id_consulta_medica")
);

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_email_key" ON "Paciente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ConsultasMedicas_id_cita_key" ON "ConsultasMedicas"("id_cita");

-- AddForeignKey
ALTER TABLE "Cita" ADD CONSTRAINT "Cita_id_doctor_fkey" FOREIGN KEY ("id_doctor") REFERENCES "Doctor"("id_doctor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cita" ADD CONSTRAINT "Cita_id_paciente_fkey" FOREIGN KEY ("id_paciente") REFERENCES "Paciente"("id_paciente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultasMedicas" ADD CONSTRAINT "ConsultasMedicas_id_cita_fkey" FOREIGN KEY ("id_cita") REFERENCES "Cita"("id_cita") ON DELETE RESTRICT ON UPDATE CASCADE;
