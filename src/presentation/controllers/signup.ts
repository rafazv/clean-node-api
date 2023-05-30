import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { type HttpRequest, type HttpResponse } from '../protocols/http'

export class SignUpController {
  handle (httpReq: HttpRequest): HttpResponse {
    if (!httpReq.body.name) {
      return badRequest(new MissingParamError('name'))
    }

    if (!httpReq.body.email) {
      return badRequest(new MissingParamError('email'))
    }

    return {
      statusCode: 200,
      body: { message: 'OK' }
    }
  }
}
