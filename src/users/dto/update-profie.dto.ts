import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nombre?: string;

  @IsOptional()
  @IsUrl({}, { message: 'La foto debe ser una URL válida' })
  @MaxLength(2048)
  fotoUrl?: string | null;
}
