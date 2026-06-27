# Installation

```bash
npm install lynnix
```

```bash
yarn add lynnix
```

```bash
pnpm add lynnix
```

Lynnix is written in TypeScript and ships with types included. No `@types/` package is needed.

## Peer dependencies

Lynnix has a lean set of optional peer dependencies. None are required to get started, so you could install only what your application needs.

| Package | What it unlocks |
| --- | --- |
| `cookie` | Cookie parsing via `req.cookies` and cookie setting via `res.setCookie` |
| `@fastify/busboy` | `multipart/form-data` and `application/x-www-form-urlencoded` body parsing |
| `body-parser` | `application/json` body parsing |
| `qs` | Advanced query string and URL-encoded body parsing |

If a feature requires a peer dependency that is not installed, Lynnix will warn you in the console at runtime rather than fail silently.

## Node.js version

Lynnix requires Node.js 18 or later.
