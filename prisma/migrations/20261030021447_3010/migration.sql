/*
  Warnings:

  - A unique constraint covering the columns `[id_doctor]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "foto_url" TEXT,
ADD COLUMN     "id_doctor" INTEGER,
ADD COLUMN     "nombre" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_id_doctor_key" ON "users"("id_doctor");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_id_doctor_fkey" FOREIGN KEY ("id_doctor") REFERENCES "Doctor"("id_doctor") ON DELETE SET NULL ON UPDATE CASCADE;
