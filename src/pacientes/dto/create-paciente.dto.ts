export class CreatePacienteDto {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  fechaNacimiento: Date;
  activo? : boolean;
}