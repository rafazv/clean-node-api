import { type HttpRequest, type HttpResponse, type Controller, type Validation } from './add-survey-controller-protocols'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpReq: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpReq.body)
    return await new Promise(resolve => { resolve(null) })
  }
}
