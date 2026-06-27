# Loaders

A `loader.js` file exports named functions matching the HTTP methods the route handles. Method names are uppercased. Lynnix calls the matching function for each incoming request and passes it the `req` and `res` objects.

```javascript
// app/posts/loader.(ts/js)
import type { LynnixRequest, LynnixResponse } from "lynnix";

export function GET() {
  return { posts: db.posts.all() };
}

export function POST(req: LynnixRequest, res: LynnixResponse) {
  const { title, content } = req.body;
  db.posts.create({ title, content });
  res.redirect("/posts");
}

export function DELETE(req: LynnixRequest, res: LynnixResponse) {
  db.posts.delete(req.params.slug);
  res.status(200).end();
}
```

## Returning data

Whatever you return from a loader becomes `data` in your template. Return a plain object — Lynnix passes it directly to Mutor.js for rendering.

```javascript
// app/posts/loader.(ts/js)
import type { LynnixRequest } from "lynnix";

export function GET(req: LynnixRequest) {
  return { title: "Posts", posts: db.posts.all() };
}
```

```html
<!-- app/posts/page.html -->
\{{ for post of data.posts }}
<article>
  <h2>\{{ post.title }}</h2>
</article>
\{{ endfor }}
```

If you return nothing, `data` is undefined in the template.

## Ending the response early

If you end the response inside a loader - via `res.redirect()`, `res.end()`, `res.json()`, `res.html()`, or any method that closes the response. Responding early means Lynnix skips rendering entirely.

```javascript
// app/posts/loader.(ts/js)
import type { LynnixRequest, LynnixResponse } from "lynnix";

export function POST(req: LynnixRequest, res: LynnixResponse) {
  db.posts.create(req.body);
  res.redirect("/posts"); // rendering skipped
}
```

## Method not allowed

If a route has a loader but no export for the requested HTTP method, Lynnix returns `405 Method Not Allowed` automatically. If a route has no loader at all, non-GET requests also return `405`.

## Async loaders

Loader functions can be async. Lynnix awaits them before rendering.

```javascript
// app/posts/loader.(ts/js)
import type { LynnixRequest } from "lynnix";

export async function GET(req: LynnixRequest) {
  const posts = await db.posts.all();
  return { posts };
}
```
