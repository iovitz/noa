import { IsOptional, IsString, Length, MaxLength } from 'class-validator';

export class FriendApplyDTO {
  @IsString()
  @Length(10, 10)
  friend_id: string;

  @IsOptional()
  @MaxLength(50)
  reason: string;
}

export class FriendApplyPassDTO {
  @IsString()
  @Length(10, 10)
  from: string;
}
