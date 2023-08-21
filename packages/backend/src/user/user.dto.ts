import {
  Length,
  Matches,
  IsString,
  Max,
  Min,
  IsOptional,
  IsArray,
  MaxLength,
  IsBoolean,
} from 'class-validator';
import { PagingDTO } from 'src/common/dto';

export class SearchUserDTO extends PagingDTO {
  @Length(0, 20)
  contains: string;
}

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

export class FriendRequestDTO {
  @Matches(/^u\d{9}$/, {
    message: 'friendId格式错误',
  })
  friendId: string;

  @IsOptional()
  @IsString()
  @Length(0, 50)
  reason?: string;
}

export class FetchUserInfoDTO {
  @Length(10, 10, {
    each: true,
  })
  userids: string[];

  @IsOptional()
  @IsBoolean()
  profile?: boolean;
}
