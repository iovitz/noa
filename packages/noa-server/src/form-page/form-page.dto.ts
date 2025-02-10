import { ApiProperty } from '@nestjs/swagger'
import { IsObject, IsOptional, IsString, Length } from 'class-validator'

export class FormFileIdParamsDTO {
  @IsString()
  @Length(26)
  @ApiProperty({
    minLength: 26,
    maxLength: 26,
    example: '01JDPPNHG28YMVDDNF5PK0MQJA',
    description: '文件ID',
  })
  fileId: string
}

export class FormWidgetParamsDTO extends FormFileIdParamsDTO {
  @IsString()
  @ApiProperty({
    minLength: 0,
    maxLength: 50,
    example: '01JDPPNHG28YMVDDNF5PK0MQJA',
    description: '组件ID',
  })
  widgetId: string
}

export class UpdateWidgetPropertyDTO {
  @IsString()
  @ApiProperty({
    minLength: 0,
    maxLength: 50,
    example: '文本组件',
    description: '组件名称',
  })
  name: string

  @IsString()
  @ApiProperty({
    minLength: 0,
    maxLength: 50,
    example: '用于收集用户信息',
    description: '组件描述',
  })
  desc: string

  @IsString()
  @ApiProperty({
    minimum: 0,
    maximum: 1000,
    example: 100,
    description: 'Widget的排序rank',
  })
  rank: number

  @IsString()
  @ApiProperty({
    minLength: 0,
    maxLength: 5000,
    example: '{}',
    description: '组件属性JSON字符串',
  })
  props: string
}

export class CreateWidgetDTO {
  @IsString()
  @Length(26)
  @ApiProperty({
    minLength: 26,
    maxLength: 26,
    example: 'wgt1234567',
    description: '前端使用ulid生成的组件ID',
  })
  widgetId: string

  @IsString()
  @ApiProperty({
    minLength: 0,
    maxLength: 50,
    example: 'Text',
    description: '组件类型',
  })
  type: string

  @IsObject()
  @IsOptional()
  @ApiProperty({
    minLength: 0,
    maxLength: 50,
    example: 'Text',
    description: '组件属性',
    nullable: true,
  })
  props?: string
}
