import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Length } from 'class-validator'

class UserAccountDTO {
  @IsString()
  @Length(6, 30)
  @IsEmail()
  @ApiProperty({
    minLength: 6,
    maxLength: 30,
    example: 'noa@gmail.com',
    description: '用户的邮箱',
  })
  email: string

  @IsString()
  @Length(6, 16)
  @ApiProperty({
    minLength: 6,
    maxLength: 16,
    example: '123123',
    description: '用户的密码',
  })
  password: string

  @IsString()
  @Length(4)
  @ApiProperty({
    minLength: 4,
    maxLength: 4,
    example: '3333',
    description: '手机验证码',
  })
  code: string
}

export class LoginDTO extends UserAccountDTO {
}

export class RegisterDTO extends UserAccountDTO {
}

export class CreateUserResponseDTO {}

export class GithubLoginDTO {
  code: string
}
