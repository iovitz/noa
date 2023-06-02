import { Injectable } from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class UserService {
  readonly zNickname = z.string().min(5).max(20);
  readonly zUsername = z.string().min(5).max(20);
  readonly zPassword = z.string().min(5).max(20);
  readonly zEmail = z.string().email().min(5).max(50);
}
