# Encryptor

A password toolkit — **Generator** (up to 1024 chars), **Wordlist** generator, and **PassQuest** (a password-rules game). Live at **[encryptor.temrevil.com](https://encryptor.temrevil.com)**.

## Stack

- **Next.js** (App Router, static export `output: 'export'`)
- **React 19** + **TypeScript**
- `next/font/google` for self-hosted fonts, light/dark theme via a `[data-theme]` CSS-variable system
- Deployed to **GitHub Pages** via the workflow in `.github/workflows/deploy.yml`

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
```

## Structure

```
app/            layout, global theme styles, page entry
components/     Navbar, Blobs, Generator, Wordlist, PassQuest, Team, Icons, EncryptorApp
lib/            passquest rules + validators
public/         images, icons, CNAME
```

By Tem Revil & Eslam Fathy.
