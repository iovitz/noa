import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length } from 'class-validator'

export class GetFormPageDTO {
  @IsString()
  @Length(26)
  @ApiProperty({
    minLength: 26,
    maxLength: 26,
    example: '01JDPPNHG28YMVDDNF5PK0MQJA',
    description: '页面类型',
  })
  pageId: string
}
