# Introduction

Lynnix is a file-based routing and SSR middleware for Node.js, built for htmx applications. It sits between your HTTP server and your templates, handling routing, rendering, middleware chains, partial responses, and error boundaries — all derived from your filesystem.

There is no config file. There is no build step. You create a directory, drop files into it following a set of naming conventions, and Lynnix wires everything together at startup.

```javascript
import { createLynnixApp } from "lynnix";
import express from "express";

const app = express();
const handler = await createLynnixApp("app");

app.use(express.static("public"));
app.use(handler);

app.listen(3000);
```

That is the entire entry point. Everything else — routes, loaders, middleware, layouts, fragments — lives in your `app/` directory.

## What Lynnix handles

**Routing.** Your directory structure is your router. A folder named `posts` maps to `/posts`. A folder named `[slug]` maps to a dynamic segment. A folder named `[[slug]]` catches everything beneath it. Lynnix resolves conflicts by specificity at startup, so the right route always wins without you having to think about ordering.

**Rendering.** Lynnix renders templates using [Mutor.js](https://github.com/allAboutJS/Mutor.js) — a fast, zero-dependency, TypeScript-native template engine. Whatever your loader returns becomes the `data` object available in your templates.

**htmx partial responses.** When a request comes in with `HX-Request: true`, Lynnix serves `fragment.html` instead of `page.html`. Your loader stays the same. No conditional logic required.

**Middleware chains.** A `middleware.js` file in any directory runs before the loader for every route in that subtree. Chains execute top-down. If any middleware ends the response, the chain stops.

**Error boundaries.** Throw a `NotFoundError` or `HttpError` from any loader or middleware. Lynnix walks up the directory tree and renders the nearest `not-found.html` or `error.html` boundary it finds.

## What Lynnix does not do

Lynnix is not a full framework. It does not manage your database, handle authentication, bundle your assets, or provide a client-side router. It handles the routing and rendering layer and stays out of everything else.

## When to use Lynnix

Lynnix is a good fit if you are building a server-rendered application with htmx and want structured routing without reaching for a full framework. It works well for dashboards, content sites, admin panels, and any application where the server produces HTML and htmx handles interactivity on the client.

If you need a client-side SPA, Lynnix is not the right tool.

## Powered by Mutor.js

Lynnix uses [Mutor.js](https://mutorjs.vercel.app) as its template engine. You do not need to configure Mutor separately — Lynnix sets it up internally based on your `app/` directory. If you need to customize Mutor's behavior, you can pass a `mutorConfig` object as the second argument to `createLynnixApp`.
