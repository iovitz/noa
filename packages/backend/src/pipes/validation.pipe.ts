import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  ValidationError,
  LoggerService,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ParamsException } from 'src/constans/errors';

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
    this.logger.log('接受参数', JSON.stringify(value));
    this.logger.log('收到Meta', JSON.stringify(metadata));
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
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
      throw new ParamsException(errorList);
    }
    return object;
  }

  private toValidate(metatype: unknown): boolean {
    const types: unknown[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
