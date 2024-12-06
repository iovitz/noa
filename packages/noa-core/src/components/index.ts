import { CheckboxParams, genCheckboxComp } from './checkbox.component'
import { genInputComp, InputParams } from './input.component'

export enum FormComponent {
  // Form
  Input = 10000,
  Checkbox = 10001,
}

export class ComponentFactory {
  static createComp(compType: FormComponent) {
    switch (compType) {
      case FormComponent.Input:
        return genInputComp()
      case FormComponent.Checkbox:
        return genCheckboxComp()
      default:
        throw new Error('Unknown component type')
    }
  }
}

export type ComponentParams = InputParams | CheckboxParams
