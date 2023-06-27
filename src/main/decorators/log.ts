import { type LogErrorRepository } from '../../data/protocols/log-error-repository'
import { type Controller, type HttpRequest, type HttpResponse } from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
  private readonly controller
  private readonly logErrorRepository

  constructor (controller: Controller, logErrorRepository: LogErrorRepository) {
    this.controller = controller
    this.logErrorRepository = logErrorRepository
  }

  async handle (httpReq: HttpRequest): Promise<HttpResponse> {
    const httpRes = await this.controller.handle(httpReq)
    if (httpRes.statusCode === 500) {
      await this.logErrorRepository.logError(httpRes.body.stack)
    }
    return httpRes
  }
}
