import { UserEntity } from '../entity/userEntity';
import { IUserRepository } from '../repository/IUserRepository';

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
  public async execute(data: Input): Promise<Result<string, Output>> {
    const u = UserEntity.create({
      name: data.name,
      email: data.email,
      password: data.password,
      createdAt: new Date(),
      updatedAt: null
    })

    const { value, error } = await this._userRepo.create(u);

    if (error !== null) {
      return err(error)
    };

    return ok({
      id: value.id,
      name: value.props.name,
      email: value.props.email,
      createdAt: value.props.createdAt,
    })
    
  }
}