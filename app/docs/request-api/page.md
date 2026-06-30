# Request API

The `req` object passed to loaders and middleware is a `LynnixRequest`. It wraps the underlying Node.js `IncomingMessage` and adds parsed properties for body, cookies, params, query, and htmx headers.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| `req.raw` | `http.IncomingMessage` | The underlying Node.js request object |
| `req.body` | `Record<string, unknown>` | Parsed request body |
| `req.files` | `LynnixUploadedFiles` | Uploaded files (multipart only) |
| `req.cookies` | `Record<string, string>` | Parsed request cookies |
| `req.params` | `Record<string, string>` | Dynamic and catch-all route parameters |
| `req.query` | `Record<string, unknown>` | Parsed query string |
| `req.htmx` | `Record<string, string>` | All `HX-*` request headers, lowercased |
| `req.isHtmx` | `boolean` | `true` if the request was made by htmx |

## `req.params`

Contains the values captured from dynamic and catch-all route segments.

```javascript
// app/posts/[slug]/loader.(ts/js)
import type { LynnixRequest } from "lynnix";

export function GET(req: LynnixRequest) {
  const { slug } = req.params; // e.g. "hello-world"
  return { post: db.posts.find(slug) };
}
```

For catch-all routes (`[[slug]]`), `req.params.slug` is the entire remaining path as a string:

```javascript
// app/[[slug]]/loader.(ts/js)
import type { LynnixRequest } from "lynnix";

export function GET(req: LynnixRequest) {
  const { slug } = req.params; // e.g. "docs/getting-started/installation"
  return { slug };
}
```

## `req.body`

Contains the parsed request body. The shape depends on the `Content-Type` of the request and which peer dependencies are installed.

| Content-Type | Peer dependency | Result |
| --- | --- | --- |
| `application/json` | — | Parsed JSON object |
| `application/x-www-form-urlencoded` | — | Parsed key-value object |
| `multipart/form-data` | `@fastify/busboy` | Parsed fields in `req.body`, files in `req.files` |

```javascript
// app/posts/loader.(ts/js)
import type { LynnixRequest, LynnixResponse } from "lynnix";

export function POST(req: LynnixRequest, res: LynnixResponse) {
  const { title, content } = req.body;
  db.posts.create({ title, content });
  res.redirect("/posts");
}
```

## `req.query`

Contains the parsed query string.

```javascript
// app/posts/loader.(ts/js)
import type { LynnixRequest } from "lynnix";

export function GET(req: LynnixRequest) {
  const { page = 1, limit = 10 } = req.query;
  return { posts: db.posts.paginate(page, limit) };
}
```

## `req.cookies`

Contains parsed request cookies.

```javascript
// app/dashboard/middleware.(ts/js)
import type { LynnixRequest, LynnixResponse } from "lynnix";

export default function (req: LynnixRequest, res: LynnixResponse) {
  if (!req.cookies.auth) {
    res.redirect("/sign-in");
  }
}
```

## `req.htmx`

Contains all `HX-*` request headers sent by htmx, keyed by their lowercased header name.

```javascript
// app/posts/loader.(ts/js)
import type { LynnixRequest } from "lynnix";

export function GET(req: LynnixRequest) {
  const trigger = req.htmx["hx-trigger"];
  const target = req.htmx["hx-target"];
  return { posts: db.posts.all() };
}
```

## `req.raw`
 
The underlying `http.IncomingMessage`. Use this for anything `LynnixRequest` does not expose directly.
 
This is particularly useful when you are mounting Lynnix on a framework that has already processed the request. If you are using Express session middleware, `req.raw.session` is available without any Lynnix peer dependency. If your framework handles file uploads, `req.raw.files` gives you the parsed result without needing `@fastify/busboy`.
 
```javascript
// app/dashboard/loader.(ts/js)
import type { LynnixRequest } from "lynnix";
 
export function GET(req: LynnixRequest) {
  const session = req.raw.session; // set by Express session middleware
  return { user: session.user };
}
```
 
```javascript
// app/upload/loader.(ts/js)
import type { LynnixRequest, LynnixResponse } from "lynnix";
 
export function POST(req: LynnixRequest, res: LynnixResponse) {
  const files = req.raw.files; // set by framework-level upload middleware
  res.json({ received: files.length });
}
```
 
Any code that touches `req.raw` is framework-specific — keep that in mind when writing loaders you want to stay portable.
