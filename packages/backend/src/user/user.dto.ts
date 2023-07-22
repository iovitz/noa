import {
  Length,
  Matches,
  IsString,
  Max,
  Min,
  IsOptional,
} from 'class-validator';

export class BPostLogin {
  @IsString({ message: '用户名需要为字符串格式' })
  @Length(6, 16, { message: '用户名长度在6~16位之间' })
  @Matches(/^[0-9a-zA-Z_]*$/, {
    message: '用户名只能由字母数字下划线组成',
  })
  username: string;

  @IsString({ message: '密码需要为字符串格式' })
  @Length(6, 16, { message: '密码长度在6~16个字符之间' })
  @Matches(/^[0-9a-zA-Z_]*$/, {
    message: '密码只能由字母数字下划线组成',
  })
  password: string;
}

export class BPostRegister extends BPostLogin {
  @IsString({ message: '昵称需要为字符串格式' })
  @Length(2, 16, { message: '昵称长度在2~20个字符之间' })
  nickname: string;
}

export class PGetUser {
  @Matches(/^\d{10}$/, {
    message: 'userid格式错误',
  })
  userid: string;
}

export class BPutUser {
  @IsOptional()
  @IsString({ message: '头像url需要为字符串格式' })
  @Length(0, 100, { message: '头像url长度在100个字符以内' })
  avatar?: string;

  @IsOptional()
  @IsString({ message: '昵称需要为字符串格式' })
  @Length(0, 20, { message: '昵称长度在2~20个字符之间' })
  nickname?: string;
}

export class PGetProfile extends PGetUser {}

export class PPostProfile {
  @IsOptional()
  @Max(1)
  @Min(0)
  gender?: number;

  @IsOptional()
  @IsString({ message: '邮箱需要为字符串格式' })
  @Length(0, 30, { message: '邮箱长度在30个字符以内' })
  email?: string;

  @IsOptional()
  @IsString({ message: '手机号需要为字符串格式' })
  @Length(0, 20, { message: '手机号长度在2~20个字符之间' })
  phone?: string;

  @IsOptional()
  @IsString({ message: '地址需要为字符串格式' })
  @Length(0, 20, { message: '地址长度在100个字符以内' })
  address?: string;
}
