import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PagingDTO {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50)
  take?: number;
}
