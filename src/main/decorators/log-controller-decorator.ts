import { type LogErrorRepository } from '../../data/protocols/db/log/log-error-repository'
import { type Controller, type HttpRequest, type HttpResponse } from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
  constructor (private readonly controller: Controller, private readonly logErrorRepository: LogErrorRepository) {}

  async handle (httpReq: HttpRequest): Promise<HttpResponse> {
    const httpRes = await this.controller.handle(httpReq)
    if (httpRes.statusCode === 500) {
      await this.logErrorRepository.logError(httpRes.body.stack)
    }
    return httpRes
  }
}
