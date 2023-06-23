import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  ValidationError,
  HttpException,
  HttpStatus,
  LoggerService,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

/**
 * 这是一个全局的参数验证管道，基于class-transformer
 * 如果失败，则会抛出HttpException
 * 在main.ts的nestApp要将它设为全局的
 */

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private logger: LoggerService) {}

  async transform(value: unknown, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    this.logger.log(value);
    this.logger.log(metadata);
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    this.logger.log(metadata);
    const errors = await validate(object);
    this.logger.log(errors);
    const errorList: string[] = [];
    const errObjList: ValidationError[] = [...errors];

    do {
      const e = errObjList.shift();
      if (!e) {
        break;
      }
      if (e.constraints) {
        for (const item in e.constraints) {
          errorList.push(e.constraints[item]);
        }
      }
      if (e.children) {
        errObjList.push(...e.children);
      }
    } while (true);
    if (errorList.length > 0) {
      throw new HttpException(
        '请求参数校验错误:' + errorList.join(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return object;
  }

  private toValidate(metatype: unknown): boolean {
    const types: unknown[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
