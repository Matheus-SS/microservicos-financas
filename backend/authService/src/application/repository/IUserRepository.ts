import { UserEntity } from "../entity/userEntity";
import { Result } from "../../resultType";
export interface IUserRepository {
  create(data: UserEntity): Promise<Result<DBError,UserEntity>>;
  findByEmail(email: string): Promise<Result<DBError | DBUserNotFound, UserEntity>>;
}

type ErrDBError = 'DB_ERROR'
export class DBError extends Error {
  name: ErrDBError;
  constructor(message: string) {
    super();
    this.name = "DB_ERROR"
    this.message = message
  }
}

type ErrDBUserNotFound = 'DB_USER_NOT_FOUND'
export class DBUserNotFound extends Error {
  name: ErrDBUserNotFound
  constructor() {
    super();
    this.name = "DB_USER_NOT_FOUND"
    this.message = 'Usuário não encontrado'
  }
}