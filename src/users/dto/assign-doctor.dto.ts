import { IsInt, IsNotEmpty } from 'class-validator';

export class AssignDoctorDto {
  @IsInt()
  @IsNotEmpty()
  id_doctor: number;
}
