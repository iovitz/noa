import { Module } from '@nestjs/common';
import { Wsv1Service } from './wsv1.service';
import { Wsv1Gateway } from './wsv1.gateway';

@Module({
  providers: [Wsv1Service, Wsv1Gateway],
})
export class Wsv1Module {}
