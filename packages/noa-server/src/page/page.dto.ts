import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, Length } from 'class-validator'
import { PagingDTO } from 'src/shared/dto/dto'

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

export class GetPagesDTO extends PagingDTO {
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

export class DeletePageDTO {
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
