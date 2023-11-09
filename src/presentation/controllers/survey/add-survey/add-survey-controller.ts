import { badRequest, serverError } from '../../../helpers/http/http-helper'
import { type HttpRequest, type HttpResponse, type Controller, type Validation, type AddSurvey } from './add-survey-controller-protocols'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {}

  async handle (httpReq: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpReq.body)
      if (error) return badRequest(error)
      const { question, answers } = httpReq.body
      await this.addSurvey.add({
        question,
        answers
      })
      return { statusCode: 204, body: null }
    } catch (error) {
      return serverError(error)
    }
  }
}
