import { prisma } from "../prismaDatabase";
import { DBError, DBUserNotFound, IUserRepository } from "../../application/repository/IUserRepository"
import { UserEntity } from "../../application/entity/userEntity";
import { ok, Result, err } from "../../resultType";

export class UserRepository implements IUserRepository {
  constructor() {}
  public async create(data: UserEntity): Promise<Result<DBError, UserEntity>> {
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
      return err(new DBError('Erro ao criar usuário'));
    }
  }

  public async findByEmail(email: string): Promise<Result<DBError | DBUserNotFound, UserEntity>> {
    try {
      const user = await prisma.conection.tbl_users.findFirst({
        where: {
          email: email
        }
      });

      if (!user) {
        return err(new DBUserNotFound())
      }

      const u =  UserEntity.create({
        name: user.name,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }, user.id);

      return ok(u);
    } catch (error: any) {

      console.log("Erro user repository findByEmail", error);
      return err(new DBError('Erro ao procurar usuário'));
    }
  }
}
