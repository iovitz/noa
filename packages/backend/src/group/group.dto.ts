import { IsString, Length } from 'class-validator';

export class CreateGroupDTO {
  @IsString({ message: '群名称需要为字符串格式' })
  @Length(0, 20, { message: '群名称长度在2~20个字符之间' })
  name: string;
}
