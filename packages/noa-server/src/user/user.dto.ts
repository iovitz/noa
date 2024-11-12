import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Length } from 'class-validator'

class UserAccountDTO {
  @IsString()
  @Length(11)
  @IsEmail()
  @ApiProperty({
    example: 'zhangsan@gmail.com',
    description: '用户的邮箱',
  })
  email: string

  @IsString()
  @Length(2, 20)
  @ApiProperty({
    example: '123456',
    description: '用户的密码',
  })
  password: string
}

export class LoginDTO extends UserAccountDTO {
  @IsString()
  @Length(4)
  @ApiProperty({
    example: '3333',
    description: '手机验证码',
  })
  code: string
}

export class RegisterDTO extends UserAccountDTO {
  @IsString()
  @Length(2, 20)
  @ApiProperty({
    example: 'zhangsan',
    description: '用户的昵称',
  })
  nickname: string

  @IsString()
  @Length(4)
  @ApiProperty({
    example: '3333',
    description: '手机验证码',
  })
  code: string
}

export class CreateUserResponseDTO {}
