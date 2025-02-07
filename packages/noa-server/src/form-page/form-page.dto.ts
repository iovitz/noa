import { ApiProperty } from '@nestjs/swagger'
import { IsObject, IsOptional, IsString, Length } from 'class-validator'

export class FormPageQueryDTO {
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

export class GetWidgetInfoDTO {
  @IsString()
  @ApiProperty({
    minLength: 0,
    maxLength: 50,
    example: 'Text',
    description: '组件类型',
  })
  type: string
}

export class CreateWidgetDTO {
  @IsString()
  @Length(26)
  @ApiProperty({
    minLength: 26,
    maxLength: 26,
    example: '01JDPPNHG28YMVDDNF5PK0MQJA',
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
