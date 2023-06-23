import { IsString, Length, Matches } from 'class-validator';

export class LoginDTO {
  @IsString({ message: 'username数据类型不为string' })
  @Length(6, 16, { message: '用户名长度在6~16位之间' })
  @Matches(/^[0-9a-zA-Z_]*$/, {
    message: '用户名由字母数字下划线组成',
  })
  username: string;

  @IsString({ message: 'username数据类型不为string' })
  @Length(6, 16, { message: '用户名长度在6~16位之间' })
  @Matches(/^[0-9a-zA-Z_]*$/, {
    message: '用户名由字母数字下划线组成',
  })
  password: string;
}
