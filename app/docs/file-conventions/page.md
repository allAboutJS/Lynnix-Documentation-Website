# File Conventions

Lynnix recognises a fixed set of filenames in any route directory. Everything outside this list is ignored by the router.

## `page.html`

The full-page HTML response for regular (non-htmx) requests to this route. Rendered against the data returned by the route's loader.

```html
<!-- app/posts/page.html -->
<h1>\{{ data.title }}</h1>
<ul>
  \{{ for post of data.posts }}
  <li>\{{ post.title }}</li>
  \{{ endfor }}
</ul>
```

If a route has no `page.html`, Lynnix acknowledges the route exists but returns an empty `200` for regular requests.

## `fragment.html`

The partial HTML response for htmx requests. Lynnix detects htmx requests by the presence of the `HX-Request: true` header and serves this file instead of `page.html`.

```html
<!-- app/posts/fragment.html -->
<ul id="posts-list">
  \{{ for post of data.posts }}
  <li>\{{ post.title }}</li>
  \{{ endfor }}
</ul>
```

The same loader data feeds both `page.html` and `fragment.html`. If a route has no `fragment.html`, Lynnix acknowledges the route exists but returns an empty `200` for htmx requests.

## `loader.js` / `loader.ts`

Exports named functions matching the HTTP methods the route handles. Method names are uppercased. See [Loaders](/docs/loaders) for full details.

```javascript
// app/posts/loader.(ts/js)
import type { LynnixRequest, LynnixResponse } from "lynnix";

export function GET(req, res) {
  return { posts: db.posts.all() };
}

export function POST(req: LynnixRequest, res: LynnixResponse) {
  db.posts.create(req.body);
  res.redirect("/posts");
}
```

## `middleware.js` / `middleware.ts`

Exports a single default function that runs before the loader on every request to this route and all routes nested beneath it. See [Middleware](/docs/middleware) for full details.

```javascript
// app/dashboard/middleware.(ts/js)
import type { LynnixRequest, LynnixResponse } from "lynnix";

export default function (req: LynnixRequest, res: LynnixResponse  ) {
  if (!req.cookies.auth) {
    res.redirect("/sign-in");
  }
}
```

## `not-found.html`

Rendered when a `NotFoundError` is thrown anywhere within this route's subtree. Acts as a 404 boundary for all routes nested beneath the directory it lives in.

```html
<!-- app/not-found.html -->
<h1>404</h1>
<p>The page you are looking for does not exist.</p>
```

## `fragment.not-found.html`

The htmx equivalent of `not-found.html`. Served in place of `not-found.html` when the request that triggered the `NotFoundError` was made by htmx.

## `error.html`

Rendered when an `HttpError` is thrown anywhere within this route's subtree. Has access to `\{{ error.code }}`, `\{{ pathname }}`, and `\{{ data }}` — the metadata object passed to `HttpError`.

```html
<!-- app/error.html -->
<h1>\{{ error.code }}</h1>
<p>\{{ data.message }}</p>
```

## `fragment.error.html`

The htmx equivalent of `error.html`. Served in place of `error.html` when the request that triggered the error was made by htmx.

---

## Summary

| File | Served for |
| --- | --- |
| `page.html` | Regular requests |
| `fragment.html` | htmx requests |
| `loader.js` / `loader.ts` | All requests — handles HTTP methods |
| `middleware.js` / `middleware.ts` | All requests — runs before the loader |
| `not-found.html` | `NotFoundError` on regular requests |
| `fragment.not-found.html` | `NotFoundError` on htmx requests |
| `error.html` | `HttpError` on regular requests |
| `fragment.error.html` | `HttpError` on htmx requests |
