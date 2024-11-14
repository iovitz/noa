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

export class NewEditDTO {
  @IsNumber()
  @ApiProperty({
    description: '页面ID',
  })
  pageId: string

  @IsNumber()
  @ApiProperty({
    example: 1,
    description: '组件ID',
  })
  compId: number

  @IsNumber()
  @ApiProperty({
    example: 30,
    description: '前端版本',
  })
  localRev: number

  @IsString()
  @Length(1, 100)
  @ApiProperty({
    example: 'SetCompProperty',
    description: '页面ID',
  })
  type: string

  @IsObject()
  @ApiProperty({
    example: {
      oV: '30',
      nV: '40',
    },
    description: '变更内容',
  })
  change: object
}
