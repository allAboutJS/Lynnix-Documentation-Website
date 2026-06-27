# Error Handling

Lynnix provides two error classes for handling expected failure cases: `NotFoundError` for missing resources and `HttpError` for everything else. Both can be thrown from any loader or middleware.

## NotFoundError

Throw a `NotFoundError` to render the nearest `not-found.html` boundary up the directory tree.

```javascript
// app/posts/[slug]/loader.(ts/js)
import { NotFoundError } from "lynnix";
import type { LynnixRequest } from "lynnix";

export function GET(req: LynnixRequest) {
  const post = db.posts.find(req.params.slug);

  if (!post) {
    throw new NotFoundError();
  }

  return { post };
}
```

For htmx requests, Lynnix serves `fragment.not-found.html` instead. If no boundary is found up the tree, Lynnix returns a plain `404`.

## HttpError

Throw an `HttpError` with a status code and an optional metadata object for any other error scenario.

```javascript
// app/dashboard/loader.(ts/js)
import { HttpError } from "lynnix";
import type { LynnixRequest } from "lynnix";

export function GET(req: LynnixRequest) {
  if (!req.user.isAdmin) {
    throw new HttpError(403, { message: "Admins only." });
  }

  return { stats: db.stats.all() };
}
```

In your error template, `\{{ error.code }}`, `\{{ pathname }}`, and `\{{ data }}` are available. `\{{ data }}` is the metadata object you passed to `HttpError`.

```html
<!-- app/error.html -->
<h1>\{{ error.code }}</h1>
<p>\{{ data.message }}</p>
<p>\{{ pathname }}</p>
```

For htmx requests, Lynnix serves `fragment.error.html` instead.

## Boundary resolution

Lynnix walks up the directory tree from the matched route to find the nearest error or not-found boundary. This means you can scope error pages to specific sections of your app.

```
app/
├── dashboard/
│   ├── not-found.html      ← catches 404s under /dashboard
│   └── error.html          ← catches errors under /dashboard
├── not-found.html          ← global 404 fallback
└── error.html              ← global error fallback
```

A `not-found.html` at `app/dashboard/not-found.html` catches 404s for any unmatched route under `/dashboard`. If no boundary is found at that level, Lynnix continues walking up until it reaches `app/`. If no boundary exists anywhere, it returns a plain `404` or `500`.
