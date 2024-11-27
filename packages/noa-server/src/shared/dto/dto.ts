import { IsNumberString } from 'class-validator'
import {
  NumberStringMax,
  NumberStringMin,
} from '../validator/string-number.validator'

export class PagingDTO {
  @IsNumberString({
    no_symbols: true,
  })
  @NumberStringMin(1)
  page: string

  @IsNumberString({
    no_symbols: true,
  })
  @NumberStringMin(0)
  @NumberStringMax(1000)
  size: string
}
