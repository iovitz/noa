import { IsString, Length } from 'class-validator';
import { PagingDTO } from 'src/common/dto';

export class CreateGroupDTO {
  @IsString()
  @Length(0, 20)
  name: string;

  @IsString()
  @Length(0, 200)
  avatar?: string;
}

export class SearchGroupDTO extends PagingDTO {
  @IsString()
  @Length(0, 20)
  contains: string;
}
