import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNumberString, Length } from 'class-validator'
import { NumberStringMax, NumberStringMin } from 'src/shared/validator/string-number.validator'

export class GetVerifyCodeDTO {
  @Length(1, 20)
  @IsEnum(['login', 'register'])
  @ApiProperty({
    minLength: 1,
    maxLength: 20,
    example: 'login',
    enum: ['login', 'register'],
    description: '验证码类型',
  })
  type: string

  @IsNumberString({
    no_symbols: true,
  })
  @NumberStringMin(0)
  @NumberStringMax(500)
  @ApiProperty({
    minLength: 1,
    maxLength: 3,
    example: '200',
    description: '验证码宽度',
  })
  width: string

  @IsNumberString({
    no_symbols: true,
  })
  @NumberStringMin(0)
  @NumberStringMax(500)
  @ApiProperty({
    minLength: 1,
    maxLength: 3,
    example: '50',
    description: '验证码高度',
  })
  height: string

  @IsNumberString({
    no_symbols: true,
  })
  @NumberStringMin(0)
  @NumberStringMax(6)
  @ApiProperty({
    maxLength: 1,
    minLength: 1,
    example: '4',
    description: '验证码高度',
  })
  length: string
}
