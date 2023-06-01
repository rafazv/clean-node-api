import { type HttpRequest, type HttpResponse } from './http'

export interface Controller {
  handle: (httpReq: HttpRequest) => Promise<HttpResponse>
}
