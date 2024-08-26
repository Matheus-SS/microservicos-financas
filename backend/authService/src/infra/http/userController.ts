import { CreateUserUseCase } from "../../application/useCase/createUserUseCase";
import { UserRepository } from "../repository/userRepository";
import http_status from "./status";
import { Request, Response } from 'express';

export class UserController {
  constructor() {}

  public async create(req: Request, res: Response) {
    const t = new CreateUserUseCase(new UserRepository())

    const r = await t.execute({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password
    });

    const httpRes = new HttpResponseBuilder()
    if (r.error !== null) {
      switch(r.error.name) {
        case 'VALIDATION_DOMAIN':
          httpRes
            .buildResponse(res)
            .buildStatusCode(http_status.UNPROCESSABLE_CONTENT)
            .buildMessage(r.error.m)
            .getResult()
            .ERROR();
          break;
        case 'DB_ERROR':
          httpRes
            .buildResponse(res)
            .buildStatusCode(http_status.INTERNAL_SERVER_ERROR)
            .buildMessage('Erro interno de servidor')
            .getResult()
            .ERROR();
          break;
        case 'USER_FOUND':
          httpRes
            .buildResponse(res)
            .buildStatusCode(http_status.CONFLICT)
            .buildMessage('Usuário já cadastrado')
            .getResult()
            .ERROR();
          break;
        default:
          httpRes
            .buildResponse(res)
            .buildStatusCode(http_status.INTERNAL_SERVER_ERROR)
            .buildMessage('Erro interno de servidor')
            .getResult()
            .ERROR();
      }
      return;
    }
    httpRes
      .buildResponse(res)
      .buildStatusCode(http_status.CREATE)
      .buildMessage(r.value)
      .getResult()
      .OK();
  }
}

class HttpResponse {
  public res!: Response;
  public statusCode!: number;
  public message: any;

  public OK() {
    return this.res.status(this.statusCode).json({ message: this.message })
  }

  public ERROR() {
    if (Array.isArray(this.message)) {
      return this.res.status(this.statusCode).json({ message: this.message })
    } else {
      return this.res.status(this.statusCode).json({ message: { key: "", val: this.message } })
    }
  }
}

interface IHttpResponseBuilder {
  buildResponse(res: Response): IHttpResponseBuilder;
  buildStatusCode(statusCode: number): IHttpResponseBuilder;
  buildMessage(message: any): IHttpResponseBuilder;
  getResult(): HttpResponse;
}

class HttpResponseBuilder implements IHttpResponseBuilder {
  private httpResponse: HttpResponse;

  constructor () {
    this.httpResponse = new HttpResponse();
  }
  public buildResponse(res: Response): IHttpResponseBuilder {
    this.httpResponse.res = res;
    return this;
  }

  public buildStatusCode(statusCode: number): IHttpResponseBuilder {
    this.httpResponse.statusCode = statusCode;
    return this;
  }

  public buildMessage(message: any): HttpResponseBuilder {
    this.httpResponse.message = message;
    return this;
  }

  public getResult(): HttpResponse {
    return this.httpResponse;
  }
}