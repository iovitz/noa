import { ApiProperty } from '@nestjs/swagger'
import { IsNumberString, IsString, Length } from 'class-validator'
import {
  NumberStringMax,
  NumberStringMin,
} from '../validator/string-number.validator'

export class PagingDTO {
  @IsNumberString({
    no_symbols: true,
  })
  @NumberStringMin(1)
  @ApiProperty({
    minLength: 1,
    maxLength: 10,
    example: '1',
    description: '分页拉取的页数',
  })
  page: string

  @IsNumberString({
    no_symbols: true,
  })
  @NumberStringMin(0)
  @NumberStringMax(1000)
  @ApiProperty({
    minLength: 1,
    maxLength: 3,
    example: '10',
    description: '每页的数据量',
  })
  size: string
}

export class FileIDQueryDTO {
  @IsString()
  @Length(26)
  @ApiProperty({
    minLength: 26,
    maxLength: 26,
    example: '01JDPPNHG28YMVDDNF5PK0MQJA',
    description: '页面类型',
  })
  fileId: string
}
