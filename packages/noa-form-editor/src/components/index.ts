import { ulid } from 'ulid'
import { FormComponentType } from './const'
import { ComponentCommon, MultiSelectProperty, SingleSelectProperty, TextProperty } from './types'

export * from './const'
export * from './types'

export interface ComponentPropertyTypeMap {
  [FormComponentType.Text]: TextProperty
  [FormComponentType.SingleSelect]: SingleSelectProperty
  [FormComponentType.MultiSelect]: MultiSelectProperty
}

export type ComponentPropertyUnionType = ComponentPropertyTypeMap[keyof ComponentPropertyTypeMap]
export type ComponentUnionType = ComponentCommon<ComponentPropertyUnionType>

export class ComponentFactory {
  static createComp<T extends keyof ComponentPropertyTypeMap>(compType: T, property: ComponentPropertyTypeMap[T]): ComponentCommon<ComponentPropertyTypeMap[T]> {
    return {
      id: ulid(),
      name: '',
      description: '',
      rank: 0,
      hidden: false,
      type: compType,
      property,
    }
  }
}
