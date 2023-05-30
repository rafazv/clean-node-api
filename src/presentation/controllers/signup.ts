import { type HttpRequest, type HttpResponse } from '../protocols/http'

export class SignUpController {
  handle (httpReq: HttpRequest): HttpResponse {
    if (!httpReq.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing param: name')
      }
    }

    if (!httpReq.body.email) {
      return {
        statusCode: 400,
        body: new Error('Missing param: email')
      }
    }
  }
}
