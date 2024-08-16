import { randomInt } from "crypto";

type UserProps = {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export class UserEntity {
  private _id: number;
  private _props: UserProps;

  private constructor(data: UserProps, id: number) {
    this._id = id;
    this._props = data;
  }

  static create(data: UserProps, id?: number) {
    return new UserEntity({
      name: data.name,
      email: data.email,
      password: data.password,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    },
     id ? id : randomInt(1000)
    );
  }

  get props() {
    return this._props
  }

  get id() {
    return this._id;
  }
}