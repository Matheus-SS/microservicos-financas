"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.PrismaServiceDatabase = void 0;
const client_1 = require("@prisma/client");
let instance;
class PrismaServiceDatabase {
    _prisma;
    constructor() {
        if (instance) {
            throw new Error("Classe já instanciada");
        }
        console.log("Conexao feita com o banco de dados PRISMA");
        this._prisma = new client_1.PrismaClient({
            log: ['query', 'info'],
        });
        instance = this;
    }
    get conection() {
        return this._prisma;
    }
    async disconnect() {
        console.log("Desconectando banco de dados PRISMA");
        await this._prisma?.$disconnect();
        return;
    }
}
exports.PrismaServiceDatabase = PrismaServiceDatabase;
exports.prisma = Object.freeze(new PrismaServiceDatabase());
