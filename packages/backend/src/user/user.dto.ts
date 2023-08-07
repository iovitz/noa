import {
  Length,
  Matches,
  IsString,
  Max,
  Min,
  IsOptional,
} from 'class-validator';

export class UserParamsDTO {
  @Matches(/^u\d{9}$/)
  userid: string;
}

export class ModifyUserDTO {
  @IsOptional()
  @IsString()
  @Length(0, 100)
  avatar?: string;

  @IsOptional()
  @IsString()
  @Length(0, 20)
  nickname?: string;
}

export class GetProfileDTO extends UserParamsDTO {}

export class ModifyProfileDTO {
  @IsOptional()
  @Max(1)
  @Min(0)
  gender?: number;

  @IsOptional()
  @IsString()
  @Length(0, 30)
  email?: string;

  @IsOptional()
  @IsString()
  @Length(0, 20)
  phone?: string;

  @IsOptional()
  @IsString()
  @Length(0, 20)
  address?: string;
}
