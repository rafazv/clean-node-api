import { type HttpRequest, type HttpResponse, type Controller, type EmailValidator, type AddAccount, type Validation } from './signup-protocols'
import { InvalidParamError } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/http-helper'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount
  private readonly validation: Validation

  constructor (emailValidator: EmailValidator, addAccount: AddAccount, validation: Validation) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle (httpReq: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpReq.body)
      if (error) return badRequest(error)

      const { name, email, password } = httpReq.body

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) return badRequest(new InvalidParamError('email'))

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
