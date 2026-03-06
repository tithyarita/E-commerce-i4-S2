import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsInt()
  userId: number;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}