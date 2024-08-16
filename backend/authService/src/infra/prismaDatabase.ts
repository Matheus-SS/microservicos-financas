import { PrismaClient } from "@prisma/client"

let instance: any;
export class PrismaServiceDatabase {
  _prisma: PrismaClient;
  constructor() {
    if (instance) {
      throw new Error("Classe já instanciada")
    }
    console.log("Conexao feita com o banco de dados PRISMA")
    this._prisma = new PrismaClient({
      log: ['query', 'info'],
    });
    instance = this
  }

  public get conection() {
   return this._prisma;
  }

  public async disconnect() {
    console.log("Desconectando banco de dados PRISMA")
    await this._prisma?.$disconnect();
    return;
  }
}

export const prisma = Object.freeze(new PrismaServiceDatabase());


