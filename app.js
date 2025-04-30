import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import next from 'next';
import { parse } from 'url';

// Configuração do ambiente
const dev = process.env.NODE_ENV !== 'production';
const hostname = 'alcateiast.com.br';
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Criação da app Next.js
const app = next({ 
  dev,
  hostname,
  port,
  customServer: true,
  conf: {
    distDir: '.next',
    compress: true,
    poweredByHeader: false,
  }
});

const handle = app.getRequestHandler();

// Preparação da aplicação
app.prepare().then(() => {
  const server = express();

  // Middleware para headers de segurança
  server.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });

  // Rotas customizadas para API/NextAuth
  server.all('/api/auth/*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  // Manipulador padrão do Next.js
  server.all('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  // Inicialização do servidor
  server.listen(port, () => {
    console.log(`
      > Ready on http://${hostname}:${port}
      > Ambiente: ${process.env.NODE_ENV}
      > API: ${process.env.NEXT_PUBLIC_API_URL}
    `);
  });
});

// Manipuladores de erro para PM2
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

function cleanup() {
  app.close().then(() => {
    console.log('> Servidor encerrado');
    process.exit(0);
  });
}