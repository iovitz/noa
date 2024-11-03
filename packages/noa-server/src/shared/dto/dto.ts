import { IsNumberString, IsOptional } from 'class-validator'
import {
  StringNumberMax,
  StringNumberMin,
} from '../validator/string-number.validator'

export class PagingDTO {
  @IsOptional()
  @IsNumberString({
    no_symbols: true,
  })
  @StringNumberMin(1)
  page?: string

  @IsOptional()
  @IsNumberString({
    no_symbols: true,
  })
  @StringNumberMin(0)
  @StringNumberMax(1000)
  size?: string
}
