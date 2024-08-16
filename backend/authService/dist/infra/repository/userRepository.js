"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const prismaDatabase_1 = require("../prismaDatabase");
class UserRepository {
    constructor() { }
    async create() {
        await prismaDatabase_1.prisma.conection.tbl_users.create({
            data: {
                email: 'guinhoguim2@gmail.com',
                name: "guinho",
                password: "123456"
            }
        });
    }
}
exports.UserRepository = UserRepository;
