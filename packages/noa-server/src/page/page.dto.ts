import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsObject, IsString, Length } from 'class-validator'

export class CreatePageDTO {
  @IsString()
  @Length(1, 30)
  @ApiProperty({
    minLength: 1,
    maxLength: 30,
    example: 'form',
    description: '页面类型',
  })
  type: string

  @IsString()
  @Length(1, 100)
  @ApiProperty({
    minLength: 1,
    maxLength: 100,
    example: '满意度调研表',
    description: '页面名称',
  })
  name: string
}
