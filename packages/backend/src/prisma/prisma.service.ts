import { Injectable } from '@nestjs/common';
import { PrismaServiceBase } from './PrismaClient';

@Injectable()
export class PrismaService extends PrismaServiceBase {}
