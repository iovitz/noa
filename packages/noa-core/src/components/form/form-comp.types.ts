import { FormCompType } from './form-comp.const'

interface ComponentBase {
  id: string
  name: string
  description: string
  index: number
  hidden: boolean
}

export interface InputComp extends ComponentBase {
  type: FormCompType.Input
  data: {
    maxLength?: boolean
    minLength?: boolean
  }
}

export interface SelectComp extends ComponentBase {
  type: FormCompType.Select
  data: {
    options: Array<{
      id: string
      name: string
    }>
  }
}

export type FormComponent = InputComp | SelectComp
