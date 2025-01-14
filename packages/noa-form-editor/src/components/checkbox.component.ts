import { ulid } from 'ulid'
import { FormComponent } from '..'

export function genCheckboxComp() {
  return {
    id: ulid(),
    name: 'Input',
    description: 'Input',
    index: 0,
    hidden: false,
    type: FormComponent.Input,
    property: {
      options: [],
    },
  } as const
}

export type CheckboxParams = ReturnType<typeof genCheckboxComp>
