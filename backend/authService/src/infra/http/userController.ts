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

    if (r.error !== null) {
      switch(r.error.name) {
        case 'DB_ERROR':
          res.status(http_status.INTERNAL_SERVER_ERROR).json({ message: 'Erro interno de servidor' });
          break;
        case 'USER_FOUND':
          res.status(http_status.CONFLICT).json({ message: 'Usuário já cadastrado' });
          break;
        default:
          res.status(http_status.INTERNAL_SERVER_ERROR).json({ message: 'Erro interno de servidor' });
      }
      return;
    }

    res.status(http_status.CREATE).json({ message: 'ok' })
  }
}

// HTTP EXCEPTION E UM SERVER RESPONSE CRIAR UM BUILDER PRA ISSO
// class ServerResponse {
//   private _statusCode: number;
//   private _res: Response;
//   private _error?: Error;
//   private _message?: string;
//   constructor(statusCode: number, res: Response, message?:string, error?: Error) {
    
//   }
// }