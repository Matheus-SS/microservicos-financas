import { UserEntity } from '../entity/userEntity';
import { DBError, DBUserNotFound, IUserRepository } from '../repository/IUserRepository';

type Input = {
  name: string;
  email: string;
  password: string;
}

type Output = {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
};

import { Result, err, ok } from "../../resultType";

export class CreateUserUseCase {
  private _userRepo: IUserRepository;
  constructor(readonly userRepo: IUserRepository) {
    this._userRepo = userRepo;
  }

  public async execute(data: Input): Promise<Result<DBError | UserFound, Output>> {
    const u = UserEntity.create({
      name: data.name,
      email: data.email,
      password: data.password,
      createdAt: new Date(),
      updatedAt: null
    });

    const { value: valUserByEmail, error: errUserByEmail } = await this._userRepo.findByEmail(u.props.email); 

    if (errUserByEmail !== null && errUserByEmail instanceof DBUserNotFound) {
      return err(new DBError(errUserByEmail.message));
    }

    if (valUserByEmail !== null && valUserByEmail.id) {
      return err(new UserFound())
    }
    const { value, error } = await this._userRepo.create(u);

    if (error !== null) {
      return err(new DBError(error.message))
    }

    return ok({
      id: value.id,
      name: value.props.name,
      email: value.props.email,
      createdAt: value.props.createdAt,
    })
  }
}

type ErrUserFound = 'USER_FOUND';
export class UserFound extends Error {
  name: ErrUserFound;
  constructor() {
    super();
    this.message = 'Usuário já existe';
    this.name = 'USER_FOUND'
  }
}
