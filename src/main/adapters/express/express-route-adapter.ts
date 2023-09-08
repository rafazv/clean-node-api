import { type HttpRequest, type Controller } from '../../../presentation/protocols'
import { type Request, type Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      res.status(httpResponse.statusCode).json(httpRequest.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpRequest.body.message
      })
    }
  }
}
