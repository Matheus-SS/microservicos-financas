import express from 'express';
import { prisma } from './infra/prismaDatabase';
import { UserController } from './infra/http/userController';
const app = express();
const port = 3000 || process.env.PORT;

const userController = new UserController();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('api auth service')
});

app.post('/register', userController.create);

const server = app.listen(port, () => {
  console.log(`Servidor Auth service rodando na porta ${port}`);
});


process.on('SIGTERM', async () => {
  console.log('Sinal SIGTERM recebido, fechando conexao HTTP');
  server.close(async () => {
    await prisma.disconnect();
    console.log('SIGTERM - Servidor HTTP fechado')
  });
});

process.on('SIGINT', async () => {
  console.log('Sinal SIGINT recebido, fechando conexao HTTP');
  server.close(async () => {
    await prisma.disconnect();
    console.log('SIGINT - Servidor HTTP fechado')
  });
});

