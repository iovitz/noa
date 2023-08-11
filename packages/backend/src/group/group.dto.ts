import { IsString, Length } from 'class-validator';

export class CreateGroupDTO {
  @IsString()
  @Length(0, 20)
  name: string;

  @IsString()
  @Length(0, 200)
  avatar?: string;
}

export class SearchGroupDTO {
  @IsString()
  @Length(0, 20)
  contains: string;
}
