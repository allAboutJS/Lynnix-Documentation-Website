# Framework Integration

Lynnix returns a standard `(req, res) => void` handler from `createLynnixApp`. Anything that can mount a Node.js request handler works.

Lynnix needs two things from the framework you are using: a request object with `headers` and a response object with `end` and `setHeader`. Anything that provides those works.

## Express

Express works out of the box. Mount Lynnix as middleware after your static file and body parser middleware.

```javascript
import { createLynnixApp } from "lynnix";
import express from "express";
import cookieParser from "cookie-parser";

async function main() {
  const app = express();
  const handler = await createLynnixApp("app");

  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(handler);

  app.listen(3000);
}

main();
```

> **Note:** If you are using Express's body parsing middleware, Lynnix's built-in body parser defers to it automatically. You do not need both.

## Bare `node:http`

Use `send-static` for static files and let Lynnix handle everything else.

```javascript
import { createLynnixApp } from "lynnix";
import sendStatic from "send-static";
import * as http from "node:http";

async function main() {
  const serve = sendStatic("public", { index: false });
  const handle = await createLynnixApp("app");

  const server = http.createServer((req, res) => {
    serve(req, res, () => handle(req, res));
  });

  server.listen(3000);
}

main();
```

## Fastify

Fastify's `reply` object exposes `reply.raw` for the underlying `ServerResponse`. Pass `req.raw` and `reply.raw` to the Lynnix handler.

```javascript
import { createLynnixApp } from "lynnix";
import Fastify from "fastify";

async function main() {
  const fastify = Fastify();
  const handler = await createLynnixApp("app");

  fastify.all("/*", (req, reply) => {
    handler(req.raw, reply.raw);
  });

  await fastify.listen({ port: 3000 });
}

main();
```

Cookie handling differs in Fastify. Install `@fastify/cookie` and set cookies via `res.raw` directly, or use Lynnix's built-in `res.setCookie` with the `cookie` peer dependency.
