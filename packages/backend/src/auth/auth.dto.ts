import { IsString, Matches, Length } from 'class-validator';

export class LoginDTO {
  @IsString()
  @Length(6, 16)
  @Matches(/^[0-9a-zA-Z_]*$/, {
    message: 'invalid username',
  })
  username: string;

  @IsString()
  @Length(6, 16)
  @Matches(/^[0-9a-zA-Z_]*$/, {
    message: 'invalid password',
  })
  password: string;
}

export class LogOutDTO {
  @IsString()
  @Length(36, 36)
  session: string;
}

export class RegisterDTO extends LoginDTO {
  @IsString()
  @Length(2, 16)
  nickname: string;
}
