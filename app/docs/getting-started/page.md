# Getting Started

Lynnix exports a function: `createLynnixApp`. Call it with the path to your application directory and it returns a standard `(req, res) => void` request handler you can mount on any Node.js HTTP server.

## With Express

```javascript
import { createLynnixApp } from "lynnix";
import express from "express";

async function main() {
  const app = express();
  const handler = await createLynnixApp("app");

  app.use(express.static("public"));
  app.use(handler);

  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
}

main();
```

## With bare `node:http`

Lynnix works with Node's built-in HTTP server out of the box. For static files, pair it with [`send-static`](https://www.npmjs.com/package/send-static):

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

  server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
}

main();
```

## Your first route

Create an `app/` directory next to your entry file. Inside it, add a `page.html`:

```
app/
└── page.html
```

```html
<!-- app/page.html -->
<h1>Hello from Lynnix</h1>
```

Start your server and visit `http://localhost:3000`. Lynnix picks up `page.html` and serves it as the response for `GET /`.

## Adding data

Create a `loader.js` alongside `page.html` and export a `GET` function. Whatever you return becomes `data` in your template.

```javascript
// app/loader.js
export function GET(req) {
  return { message: "Hello from Lynnix" };
}
```

```html
<!-- app/page.html -->
<h1>\{{ data.message }}</h1>
```

## `createLynnixApp(path, mutorConfig?, bodyParserOptions?)`

| Parameter | Type | Description |
| --- | --- | --- |
| `path` | `string` | The root directory of your application (e.g. `"app"`) |
| `mutorConfig` | `PartialMutorConfig` | Optional Lynnix configuration (excluding `rootDir`) |
| `bodyParserOptions` | `ParseReqBodyOptions` | Optional body parser limits and settings |

`createLynnixApp` is async — it scans your directory and registers routes at startup. Always `await` it before mounting the handler.
