export enum FormComponent {
  // Form
  Input = 10000,
  Checkbox = 10001,
}

export interface ComponentBase<T extends FormComponent = any, P extends Record<string, unknown> = Record<string, any>> {
  id: string
  name: string
  description: string
  index: number
  hidden: boolean
  type: T
  property: {
    marginLeft: number
  } & P
}

export interface InputComp extends ComponentBase<FormComponent.Input, {
  maxLength: number
  minLength: number
}> {
}

export interface CheckboxComponent extends ComponentBase<FormComponent.Checkbox, {
  options: string[]
}> {
}
