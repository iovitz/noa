import { ComponentType } from '.'

export abstract class BaseComp {
  abstract type: ComponentType
  constructor(private id: string, private name: string) {}
}
