# Fragments & htmx

When htmx makes a request, it sends an `HX-Request: true` header. Lynnix detects this automatically and renders `fragment.html` instead of `page.html`, giving you clean partial responses without any conditional logic in your loader.

## fragment.html

`fragment.html` is the htmx counterpart to `page.html`. It lives in the same route directory and receives the same loader data.

```html
<!-- app/posts/page.html -->
<!doctype html>
<html>
  <body>
    <div id="posts-list">
      \{{ for post of data.posts }}
      <article>\{{ post.title }}</article>
      \{{ endfor }}
    </div>
  </body>
</html>
```

```html
<!-- app/posts/fragment.html -->
<div id="posts-list">
  \{{ for post of data.posts }}
  <article>\{{ post.title }}</article>
  \{{ endfor }}
</div>
```

Your loader does not need to change — the same return value feeds both files.

## Branching in the loader

If you need to return different data depending on whether the request came from htmx, check `req.isHtmx`:

```javascript
// app/posts/loader.(ts/js)
import type { LynnixRequest } from "lynnix";

export function GET(req: LynnixRequest) {
  if (req.isHtmx) {
    return { posts: db.posts.all() };
  }

  return { title: "Posts", posts: db.posts.all() };
}
```

## htmx request headers

All `HX-*` request headers are available on `req.htmx` as a plain object with lowercased keys:

```javascript
// app/posts/loader.(ts/js)
import type { LynnixRequest } from "lynnix";

export function GET(req: LynnixRequest) {
  const trigger = req.htmx["hx-trigger"];
  const target = req.htmx["hx-target"];

  return { posts: db.posts.all() };
}
```

## htmx response headers

Lynnix exposes dedicated methods on `res` for every htmx response header. These are no-ops for non-htmx requests, so you can call them freely without checking `req.isHtmx`.

```javascript
// app/posts/loader.(ts/js)
import type { LynnixRequest, LynnixResponse } from "lynnix";

export function POST(req: LynnixRequest, res: LynnixResponse) {
  db.posts.create(req.body);
  res.htmxTrigger("posts:updated");
  res.htmxPush("/posts");
  res.status(200).end();
}
```

See [Response API](/docs/response-api) for the full list of htmx response header methods.

## Missing fragment.html

If a route exists but has no `fragment.html`, Lynnix acknowledges the route and returns an empty `200` for htmx requests.
