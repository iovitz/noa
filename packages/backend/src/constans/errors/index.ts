export class ParamsException extends Error {
  constructor(public errorList: string[]) {
    super();
  }
}
