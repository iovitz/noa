import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsObject, IsString, Length } from 'class-validator'

export class NewEditDTO {
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: '页面ID',
  })
  pageId: number

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
