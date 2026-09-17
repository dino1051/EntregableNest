export class CreateDoctorDto {
  nombre: string;
  apellido: string;
  especialidad: string;
  telefono: string;
  email: string;
  activo? : boolean;
}