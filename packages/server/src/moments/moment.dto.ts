import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class PublishMomentDTO {
  @IsOptional()
  @IsString()
  @MaxLength(10000)
  content: string;

  @IsOptional()
  @IsArray()
  @MaxLength(1000)
  media: string[];

  @IsOptional()
  @IsBoolean()
  private: boolean;
}
