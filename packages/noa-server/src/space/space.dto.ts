import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, Length } from 'class-validator'
import { PagingDTO } from 'src/shared/dto/dto'

export class GetFilesDTO extends PagingDTO {
  @IsString()
  @Length(1, 30)
  @IsOptional()
  @ApiProperty({
    minLength: 1,
    maxLength: 30,
    example: 'form',
    description: '页面类型',
  })
  type?: string
}

export class PatchFileDTO {
  @IsString()
  @Length(1, 30)
  @IsOptional()
  @ApiProperty({
    minLength: 1,
    maxLength: 30,
    required: false,
    example: '文件名称',
    description: '页面名称',
  })
  name?: string
}

export class CreateFileDTO {
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
  @Length(1, 30)
  @IsOptional()
  @ApiProperty({
    minLength: 1,
    maxLength: 30,
    required: false,
    example: '文件名称',
    description: '页面名称',
  })
  name?: string

  @IsString()
  @Length(1, 100)
  @IsOptional()
  @ApiProperty({
    maxLength: 26,
    minLength: 26,
    required: false,
    example: '01JDPPNHG28YMVDDNF5PK0MQJA',
    description: '模板ID',
  })
  templateId?: string
}
