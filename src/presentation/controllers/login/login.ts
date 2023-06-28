import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { type Controller, type HttpRequest, type HttpResponse } from '../../protocols'

export class LoginController implements Controller {
  async handle (httpReq: HttpRequest): Promise<HttpResponse> {
    if (!httpReq.body.email) return await new Promise(resolve => { resolve(badRequest(new MissingParamError('email'))) })
    if (!httpReq.body.password) return await new Promise(resolve => { resolve(badRequest(new MissingParamError('password'))) })
  }
}
