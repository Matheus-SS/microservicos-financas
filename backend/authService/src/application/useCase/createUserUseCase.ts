import { UserEntity, ValidationDomain } from '../entity/userEntity';
import { DBError, IUserRepository } from '../repository/IUserRepository';

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

  public async execute(data: Input): Promise<Result<ValidationDomain | DBError | UserFound, Output>> {
    const { value: u, error: e } = UserEntity.create({
      name: data.name,
      email: data.email,
      password: data.password,
      createdAt: new Date(),
      updatedAt: null
    });

    if (e !== null) {
      return err(new ValidationDomain(e));
    } 

    const { value: valUserByEmail, error: errUserByEmail } = await this._userRepo.findByEmail(u.props.email); 

    if (errUserByEmail !== null && errUserByEmail instanceof DBError) {
      return err(new DBError(errUserByEmail.message))
    }

    if (valUserByEmail !== null) {
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

