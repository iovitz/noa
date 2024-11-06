import { homedir } from 'node:os'
import { join } from 'node:path'
import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Component } from 'react'
import { FormValue } from 'src/sqlite/form-value.entity'
import { Page } from 'src/sqlite/page.entity'
import { User } from 'src/sqlite/user.entity'
import { EncryptService } from './encrypt/encrypt.service'
import { HttpService } from './http/http.service'
import { TracerService } from './tracer/tracer.service'

@Global()
@Module({
  // 全局使用的一些Service
  providers: [EncryptService, TracerService, HttpService],
  exports: [EncryptService, TracerService, HttpService],
})
export class GlobalModule {}
