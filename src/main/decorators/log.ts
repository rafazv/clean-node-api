import { type Controller, type HttpRequest, type HttpResponse } from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
  private readonly controller

  constructor (controller: Controller) {
    this.controller = controller
  }

  async handle (httpReq: HttpRequest): Promise<HttpResponse> {
    const httpRes = await this.controller.handle(httpReq)
    // if (httpRes.statusCode === 500) {

    // }
    return httpRes
  }
}
