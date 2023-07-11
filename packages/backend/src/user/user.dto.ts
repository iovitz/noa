import { Length, Matches, IsString } from 'class-validator';

export class BPostLogin {
  @IsString({ message: '用户名为字符格式' })
  @Length(6, 16, { message: '用户名长度在6~16位之间' })
  @Matches(/^[0-9a-zA-Z_]*$/, {
    message: '用户名只能由字母数字下划线组成',
  })
  username: string;

  @IsString({ message: '密码为字符格式' })
  @Length(6, 16, { message: '密码长度在6~16个字符之间' })
  @Matches(/^[0-9a-zA-Z_]*$/, {
    message: '密码只能由字母数字下划线组成',
  })
  password: string;
}

export class BPostRegister extends BPostLogin {
  @IsString({ message: '昵称为字符格式' })
  @Length(6, 16, { message: '昵称长度在2~20个字符之间' })
  nickname: string;
}

export class PGetUser {
  @Matches(/^\d{10}$/, {
    message: 'userid格式错误',
  })
  userid: string;
}

export class BPutUser {
  @IsString()
  @Length(0, 100, { message: '头像url长度在2~20个字符之间' })
  avatar: string;
}
