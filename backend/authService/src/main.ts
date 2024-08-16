import express from 'express';
import { prisma } from './infra/prismaDatabase';
import { UserRepository } from './infra/repository/userRepository';
import { CreateUserUseCase } from './application/useCase/createUserUseCase'
const app = express();
const port = 3000 || process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('api auth service')
});

app.post('/register', async (req, res) => {
  const t = new CreateUserUseCase(new UserRepository())

  const r = await t.execute({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password
  });

  if (r.error !== null) {
    res.status(500).json({ message: r.error });
    return;
  }
  res.status(201).json({ message: 'ok' })
});

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

