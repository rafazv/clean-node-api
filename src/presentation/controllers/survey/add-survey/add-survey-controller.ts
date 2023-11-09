import { badRequest } from '../../../helpers/http/http-helper'
import { type HttpRequest, type HttpResponse, type Controller, type Validation } from './add-survey-controller-protocols'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpReq: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpReq.body)
    if (error) return badRequest(error)
    return await new Promise(resolve => { resolve(null) })
  }
}
