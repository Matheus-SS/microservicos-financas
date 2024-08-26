import { randomInt } from "crypto";
import { err, ok } from "../../resultType";

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

  constructor(data: UserProps, id: number) {
    this._id = id;
    this._props = data;
  }

  static create(data: UserProps, id?: number) {
    const errors: { key: string, val: string }[] = [];

    if (!data.name) {
      errors.push({
        key: 'name',
        val: 'Nome obrigatório' 
      });
    }

    if (data.name?.trim().length < 4) {
      errors.push({
        key: 'name',
        val: 'Nome deve ser maior que 4 caracteres' 
      });
    }

    if (!data.email) {
      errors.push({
        key: 'email',
        val: 'Email obrigatório' 
      });
    }

    const emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    if (!emailRegex.test(data?.email)) {
      errors.push({
        key: 'email',
        val: 'Formato de email inválido' 
      });
    }

    if (data?.password.length < 6) {
      errors.push({
        key: 'password',
        val: 'Senha deve maior que 6 caracteres' 
      });
    }

    if (errors.length > 0) {
      return err(errors)
    }
    const u = new UserEntity({
      name: data.name.trim(),
      email: data.email.trim(),
      password: data.password.trim(),
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    },
     id ? id : randomInt(1000)
    );

    return ok(u)
  }

  get props() {
    return this._props
  }

  get id() {
    return this._id;
  }
}

type ErrValidationDomain = 'VALIDATION_DOMAIN';
export class ValidationDomain extends Error {
  name: ErrValidationDomain;
  m: { key: string, val: string }[];
  constructor(message: { key: string, val: string }[]) {
    super();
    this.m = message
    this.name = 'VALIDATION_DOMAIN'
  }
}