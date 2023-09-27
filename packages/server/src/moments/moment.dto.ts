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
  content?: string;

  @IsOptional()
  @IsArray()
  @MaxLength(1000)
  medias?: string;

  @IsOptional()
  @IsBoolean()
  published?: boolean;
}
