import { UserEntity } from "../entity/userEntity";
import { Result } from "../../resultType";
export interface IUserRepository {
  create(data: UserEntity): Promise<Result<string,UserEntity>>;
}