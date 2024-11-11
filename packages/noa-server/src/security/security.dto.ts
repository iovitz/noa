import { Optional } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNumberString, IsString, Length } from 'class-validator'
import { NumberStringMax, NumberStringMin } from 'src/shared/validator/string-number.validator'

export class GetVerifyCodeDTO {
  @Length(1, 20)
  @IsEnum(['login', 'register'])
  @ApiProperty({
    example: 'login',
    description: '验证码类型',
  })
  type: string

  @IsNumberString({
    no_symbols: true,
  })
  @NumberStringMin(0)
  @NumberStringMax(1000)
  @ApiProperty({
    example: '200',
    description: '验证码宽度',
  })
  width: string

  @IsNumberString({
    no_symbols: true,
  })
  @NumberStringMin(0)
  @NumberStringMax(1000)
  @ApiProperty({
    example: '50',
    description: '验证码高度',
  })
  height: string

  @Optional()
  @IsNumberString({
    no_symbols: true,
  })
  @NumberStringMin(0)
  @NumberStringMax(1000)
  @ApiProperty({
    example: '4',
    description: '验证码高度',
    default: '4',
  })
  length: string
}
