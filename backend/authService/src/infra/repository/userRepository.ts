import { prisma } from "../prismaDatabase";
import { IUserRepository } from "../../application/repository/IUserRepository"
import { UserEntity } from "../../application/entity/userEntity";
import { ok, Result, err } from "../../resultType";

export class UserRepository implements IUserRepository {
  constructor() {}
  public async create(data: UserEntity): Promise<Result<string, UserEntity>> {
    try {
      const user = await prisma.conection.tbl_users.create({
        data: {
          email: data.props.email,
          name: data.props.name,
          password: data.props.password
        }
      });

      const u =  UserEntity.create({
        name: user.name,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }, user.id);

      return ok(u);
    } catch (error: any) {

      console.log("Erro user repository create", error);
      return err('Erro ao criar usuario');
    }
  }
}
