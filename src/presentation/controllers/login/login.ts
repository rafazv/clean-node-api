import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok } from '../../helpers/http-helper'
import { type Controller, type HttpRequest, type HttpResponse } from '../../protocols'
import { type EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpReq: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpReq.body
    if (!email) return await new Promise(resolve => { resolve(badRequest(new MissingParamError('email'))) })
    if (!password) return await new Promise(resolve => { resolve(badRequest(new MissingParamError('password'))) })

    const isValid = this.emailValidator.isValid(email)
    if (!isValid) return await new Promise(resolve => { resolve(badRequest(new InvalidParamError('email'))) })

    return await new Promise(resolve => { resolve(ok(isValid)) })
  }
}
