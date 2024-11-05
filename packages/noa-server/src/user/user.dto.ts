import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length } from 'class-validator'
import { PagingDTO } from 'src/shared/dto/dto'

export class getUsersDTO extends PagingDTO {}

export class CreateUserDTO {
  @IsString()
  @Length(2, 20)
  @ApiProperty({
    example: 'zhangsan',
    description: '用户的昵称',
  })
  name: string

  @IsString()
  @Length(2, 20)
  @ApiProperty({
    example: '123456',
    description: '用户的密码',
  })
  password: string

  @IsString()
  @Length(11)
  @ApiProperty({
    example: '13333333333',
    description: '用户的手机号',
  })
  phone: string

  @IsString()
  @Length(4)
  @ApiProperty({
    example: '3333',
    description: '手机验证码',
  })
  code: string
}

export class CreateUserResponseDTO {}
