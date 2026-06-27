# Routing

Lynnix builds its route table from your `app/` directory at startup. Every directory that contains at least one reserved file is registered as a route. The directory structure maps directly to URL paths.

## Static routes

A directory named `about` maps to `/about`. Nest them as deep as you like.

```
app/
├── about/
│   └── page.html       → /about
├── blog/
│   └── page.html       → /blog
└── page.html           → /
```

## Dynamic routes

Wrap a directory name in square brackets to create a dynamic segment. The captured value is available in your loader as `req.params`.

```
app/
└── posts/
    ├── [slug]/
    │   ├── loader.js
    │   └── page.html   → /posts/:slug
    └── page.html       → /posts
```

```javascript
// app/posts/[slug]/loader.(ts/js)
import type { LynnixRequest, LynnixResponse } from "lynnix";


export function GET(req: LynnixRequest) {
  const { slug } = req.params;
  const post = db.posts.find(slug);
  return { post };
}
```

## Catch-all routes

Double brackets capture every path segment from that point onward. Use this for wildcard pages, CMS-driven routes, or custom 404 experiences.

```
app/
└── [[slug]]/
    ├── loader.js
    └── page.html       → /anything, /a/b/c, /a/b/c/d ...
```

The entire remaining path is available as a string in `req.params`:

```javascript
// app/[[slug]]/loader.(ts/js)
import type { LynnixRequest } from "lynnix";

export function GET(req: LynnixRequest) {
  const { slug } = req.params; // e.g. "docs/getting-started/installation"
  return { slug };
}
```

## Route priority

When multiple routes could match the same path, Lynnix resolves the conflict by specificity. The more concrete a route is, the higher its priority. Specificity is determined by three factors in order:

**1. Tier.** Static routes always beat dynamic routes, which always beat catch-all routes.

**2. Static segment count.** Within the same tier, routes with more concrete (non-dynamic) segments win. `/posts/featured` has two static segments and beats `/posts/[slug]` which has one.

**3. Depth.** When two routes in the same tier have the same number of static segments, shallower routes win for static and dynamic routes, while deeper routes win for catch-all routes — a more constrained prefix is more specific.

A few examples:

| Request path | Matched route | Reason |
| --- | --- | --- |
| `/posts/featured` | `/posts/featured` | Static beats dynamic |
| `/posts/hello-world` | `/posts/[slug]` | Dynamic picks it up |
| `/electronics/featured` | `/[category]/featured` | More static segments wins |
| `/electronics/some-product` | `/[category]/[slug]` | Falls through to two-dynamic route |
| `/posts/a/b/c` | `/posts/[[slug]]` | Deeper catch-all prefix beats shallower |
| `/anything/goes/here` | `/[[slug]]` | Root catch-all is the last resort |

Lynnix sorts routes at startup, so the correct route always wins without any runtime overhead.
