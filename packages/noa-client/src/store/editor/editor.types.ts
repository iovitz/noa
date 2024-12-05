export enum ComponentType {
  // Form
  Input = 10000,
  Select = 10001,
}

export interface ComponentBase<T extends ComponentType = any, P extends Record<string, unknown> = Record<string, any>> {
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

export interface InputComp extends ComponentBase<ComponentType.Input, {
  maxLength: number
  minLength: number
}> {
}

export const defaultInputComp: InputComp = {
  id: '1',
  name: 'Input',
  description: 'Input',
  index: 0,
  hidden: false,
  type: ComponentType.Input,
  property: {
    marginLeft: 0,
    maxLength: 10,
    minLength: 0,
  },
}

export interface SelectComp extends ComponentBase<ComponentType.Select, {
  options: string[]
}> {
}

export type FormComponent = InputComp | SelectComp
