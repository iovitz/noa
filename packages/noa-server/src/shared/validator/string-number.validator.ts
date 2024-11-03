import {
  registerDecorator,

  ValidationArguments,

  ValidationOptions,
} from 'class-validator'

export function StringNumberMax(
  maxValue: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'stringNumberMin',
      target: object.constructor,
      propertyName,
      constraints: [maxValue],
      options: validationOptions ?? {
        message: `${propertyName} name must be a string and not be greater than ${maxValue}`,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints
          return (
            typeof value === 'string' && Number(value) <= relatedPropertyName
          ) // you can return a Promise<boolean> here as well, if you want to make async validation
        },
      },
    })
  }
}

export function StringNumberMin(
  minValue: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'stringNumberMin',
      target: object.constructor,
      propertyName,
      constraints: [minValue],
      options: validationOptions ?? {
        message: `${propertyName} name must be a string and not be less than ${minValue}`,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints
          return (
            typeof value === 'string' && Number(value) >= relatedPropertyName
          ) // you can return a Promise<boolean> here as well, if you want to make async validation
        },
      },
    })
  }
}
