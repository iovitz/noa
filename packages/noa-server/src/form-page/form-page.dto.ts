import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length } from 'class-validator'

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
    maxLength: 5000,
    example: '{}',
    description: '组件属性JSON字符串',
  })
  attributes: string
}
