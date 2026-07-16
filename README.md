# 4UCoworking Landing Page

Landing page institucional do 4UCoworking, em Niterói, com apresentação dos espaços, valores, localização e captação de leads pelo WhatsApp.

## Desenvolvimento

Requisitos: Node.js 18 ou superior e npm.

```bash
npm ci
npm run dev
```

## Build de produção

```bash
npm run build
```

Os arquivos prontos para publicação são gerados em `dist/`.

## Deploy

Em serviços como Vercel, Netlify ou Cloudflare Pages, configure:

- Comando de build: `npm run build`
- Diretório de publicação: `dist`

O projeto não depende de variáveis de ambiente nem de um servidor de aplicação.
