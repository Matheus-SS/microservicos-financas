"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prismaDatabase_1 = require("./infra/prismaDatabase");
const userRepository_1 = require("./infra/repository/userRepository");
const app = (0, express_1.default)();
const port = 3000 || process.env.PORT;
app.get('/', (req, res) => {
    res.send('api auth service');
});
app.get('/teste', async (req, res) => {
    const t = new userRepository_1.UserRepository();
    await t.create();
    res.send('teste');
});
const server = app.listen(port, () => {
    console.log(`Servidor Auth service rodando na porta ${port}`);
});
process.on('SIGTERM', async () => {
    console.log('Sinal SIGTERM recebido, fechando conexao HTTP');
    server.close(async () => {
        await prismaDatabase_1.prisma.disconnect();
        console.log('SIGTERM - Servidor HTTP fechado');
    });
});
process.on('SIGINT', async () => {
    console.log('Sinal SIGINT recebido, fechando conexao HTTP');
    server.close(async () => {
        await prismaDatabase_1.prisma.disconnect();
        console.log('SIGINT - Servidor HTTP fechado');
    });
});
