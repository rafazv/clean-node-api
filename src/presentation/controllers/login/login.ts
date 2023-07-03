import { type Validation, type Authentication, type Controller, type HttpRequest, type HttpResponse } from './login-protocols'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http/http-helper'

export class LoginController implements Controller {
  private readonly validation: Validation
  private readonly authentication: Authentication

  constructor (validation: Validation, authentication: Authentication) {
    this.validation = validation
    this.authentication = authentication
  }

  async handle (httpReq: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpReq.body)
      if (error) return badRequest(error)

      const { email, password } = httpReq.body
      const accessToken = await this.authentication.auth(email, password)
      if (!accessToken) return unauthorized()

      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
