import { MissingParamError } from '../../errors'
import { badRequest, ok } from '../../helpers/http-helper'
import { type Controller, type HttpRequest, type HttpResponse } from '../../protocols'
import { type EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpReq: HttpRequest): Promise<HttpResponse> {
    if (!httpReq.body.email) return await new Promise(resolve => { resolve(badRequest(new MissingParamError('email'))) })
    if (!httpReq.body.password) return await new Promise(resolve => { resolve(badRequest(new MissingParamError('password'))) })
    // this.emailValidator.isValid(httpReq.body.email)
    return await new Promise(resolve => { resolve(ok(this.emailValidator.isValid(httpReq.body.email))) })
  }
}
