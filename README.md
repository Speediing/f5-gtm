# Grok Bot for F5 sales

Password-protected F5 customer leave-behind built from the customer GTM
template.

## Run locally

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The default password is
`land2expand`. Set `SITE_PASSWORD` to override it.

## Checks

```bash
npm run lint
npm run build
```

The F5 wordmark loads from F5's official asset host:
`https://www.f5.com/content/dam/f5-com/global-assets/images/f5-logo.svg`.

## Deploy

Deploy under the `jasonwiker` Vercel team with `SITE_PASSWORD=land2expand`.
The production alias is `f5-grokbot.vercel.app`.
