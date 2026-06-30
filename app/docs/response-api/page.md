# Response API

The `res` object passed to loaders and middleware is a `LynnixResponse`. It wraps the underlying Node.js `ServerResponse` and adds methods for setting status, sending responses, managing cookies, and controlling htmx behaviour.

## Core

| Method | Description |
| --- | --- |
| `res.status(code)` | Set the HTTP status code. Returns `this` for chaining. |
| `res.end(value?)` | End the response, optionally with a body. |
| `res.html(content)` | Send an HTML response with the correct `Content-Type`. |
| `res.json(content)` | Send a JSON response with the correct `Content-Type`. |
| `res.redirect(url, permanent?)` | Redirect the client. htmx-aware — sets `HX-Redirect` for htmx requests. Pass `true` for a `301` permanent redirect. |

```javascript
// app/posts/loader.(ts/js)
import type { LynnixRequest, LynnixResponse } from "lynnix";

export function POST(req: LynnixRequest, res: LynnixResponse) {
  db.posts.create(req.body);
  res.redirect("/posts");
}
```

```javascript
// app/api/posts/loader.(ts/js)
import type { LynnixRequest, LynnixResponse } from "lynnix";

export function GET(req: LynnixRequest, res: LynnixResponse) {
  res.json({ posts: db.posts.all() });
}
```

## Cookies

| Method | Description |
| --- | --- |
| `res.setCookie(name, value, options)` | Set a cookie on the response. |
| `res.deleteCookie(name)` | Delete a cookie by setting it as expired. |
| `res.cookies` | The current response cookies as a plain object. |

```javascript
// app/sign-in/loader.(ts/js)
import type { LynnixRequest, LynnixResponse } from "lynnix";

export function POST(req: LynnixRequest, res: LynnixResponse) {
  const user = db.users.authenticate(req.body);

  if (!user) {
    res.status(401).end();
    return;
  }

  res.setCookie("auth", user.token, { httpOnly: true });
  res.redirect("/dashboard");
}
```

## htmx response headers

These methods set htmx-specific response headers. They are no-ops for non-htmx requests, so you can call them freely without checking `req.isHtmx`.

| Method | Description |
| --- | --- |
| `res.htmxTrigger(event)` | Trigger a client-side event via `HX-Trigger`. |
| `res.htmxTriggerAfterSwap(event)` | Trigger an event after the swap via `HX-Trigger-After-Swap`. |
| `res.htmxTriggerAfterSettle(event)` | Trigger an event after settle via `HX-Trigger-After-Settle`. |
| `res.htmxPush(url)` | Push a URL to the browser history via `HX-Push-Url`. Pass `false` to prevent pushing. |
| `res.htmxReplaceUrl(url)` | Replace the current URL via `HX-Replace-Url`. |
| `res.htmxRedirect(url)` | Client-side redirect via `HX-Redirect`. |
| `res.htmxLocation(location)` | Navigate without a full page reload via `HX-Location`. |
| `res.htmxReswap(strategy)` | Override the swap strategy via `HX-Reswap`. |
| `res.htmxRetarget(selector)` | Override the target element via `HX-Retarget`. |
| `res.htmxReselect(selector)` | Override the select expression via `HX-Reselect`. |
| `res.htmxRefresh()` | Trigger a full page refresh via `HX-Refresh`. |

```javascript
// app/posts/loader.(ts/js)
import type { LynnixRequest, LynnixResponse } from "lynnix";

export function POST(req: LynnixRequest, res: LynnixResponse) {
  db.posts.create(req.body);
  res.htmxTrigger("posts:created");
  res.htmxPush("/posts");
  res.status(200).end();
}
```

## Chaining

`res.status()` returns `this`, so you can chain it with `end()`:

```javascript
// app/posts/[slug]/loader.(ts/js)
import { NotFoundError } from "lynnix";
import type { LynnixRequest, LynnixResponse } from "lynnix";

export function DELETE(req: LynnixRequest, res: LynnixResponse) {
  const deleted = db.posts.delete(req.params.slug);

  if (!deleted) {
    throw new NotFoundError();
  }

  res.status(200).end();
}
```

## `res.raw`
 
The underlying `http.ServerResponse`. Use this for anything `LynnixResponse` does not expose directly. Any code that touches `res.raw` is framework-specific — keep that in mind when writing loaders you want to stay portable.
