import { type Controller, type HttpRequest, type HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    class ControllerStub implements Controller {
      async handle (httpReq: HttpRequest): Promise<HttpResponse> {
        const httpRes: HttpResponse = {
          statusCode: 200,
          body: {
            name: 'Rafaela'
          }
        }
        return await new Promise(resolve => { resolve(httpRes) })
      }
    }
    const controllerStub = new ControllerStub()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const sut = new LogControllerDecorator(controllerStub)
    const httpReq = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpReq)
    expect(handleSpy).toHaveBeenCalledWith(httpReq)
  })
})
