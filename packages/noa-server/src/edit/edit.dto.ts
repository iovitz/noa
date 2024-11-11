import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsObject, IsString, Length } from 'class-validator'

export class NewEditDTO {
  @IsString()
  @Length(10)
  @ApiProperty({
    example: 'pagabcdefg',
    description: '页面ID',
  })
  pageId: string

  @IsString()
  @Length(10)
  @ApiProperty({
    example: 'pagabcdefg',
    description: '页面ID',
  })
  cmpId: string

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
