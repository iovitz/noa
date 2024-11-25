import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, Length } from 'class-validator'

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
  @IsOptional()
  @ApiProperty({
    maxLength: 26,
    minLength: 26,
    required: false,
    example: '模板ID',
    description: '模板ID',
  })
  templateId?: string
}

export class GetPageDTO {
  @IsString()
  @Length(26)
  @ApiProperty({
    minLength: 26,
    maxLength: 26,
    example: 'id',
    description: '页面类型',
  })
  pageId: string
}
