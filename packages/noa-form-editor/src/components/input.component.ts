import { ulid } from 'ulid'
import { FormComponent } from '..'

export function genInputComp() {
  return {
    id: ulid(),
    name: 'Input',
    description: 'Input',
    index: 0,
    hidden: false,
    type: FormComponent.Input,
    property: {
      maxLength: 10,
      minLength: 0,
    },
  } as const
}

export type InputParams = ReturnType<typeof genInputComp>
