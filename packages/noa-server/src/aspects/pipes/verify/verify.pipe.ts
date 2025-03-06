import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import { Tracer } from 'src/shared/tracer/tracer'

@Injectable()
export class VerifyPipe implements PipeTransform {
  private tracer = new Tracer(VerifyPipe.name)

  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata
    const object = plainToClass(metatype, value)
    const errors = await validate(object, {
      whitelist: true,
      forbidNonWhitelisted: true,
    })
    if (errors.length > 0) {
      const errorMessages = this.buildErrorMessage(errors)
      this.tracer.debug('Params Error', {
        // tracerId: req
        errors,
      })
      throw new UnprocessableEntityException(errorMessages)
    }

    return value
  }

  private buildErrorMessage(errors: ValidationError[]): string[] {
    return errors
      .map((error) => {
        if (error.constraints) {
          return Object.values(error.constraints).join(', ')
        }
        else if (error.children) {
          return this.buildErrorMessage(error.children)
        }
        return ''
      })
      .flat()
  }
}
