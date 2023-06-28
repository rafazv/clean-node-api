import { type Validation } from './validation'

export class ValidationComposite implements Validation {
  private readonly validations: Validation[]

  constructor (validations: Validation[]) {
    this.validations = validations
  }

  validate (input: any): Error | null {
    this.validations.forEach((validation) => {
      const error = validation.validate(input)
      if (error) return error
    })
    return null
  }
}
