# Middleware

A `middleware.(ts/js)` file exports a single default function. It runs before the loader on every request to that route and all routes nested beneath it.

```javascript
// app/dashboard/middleware.(ts/js)
import type { LynnixRequest, LynnixResponse } from "lynnix";
import { users } from "../lib/users.js";

export default function (req: LynnixRequest, res: LynnixResponse) {
  const userId = req.cookies.auth;

  if (!userId) {
    res.redirect("/sign-in");
    return;
  }

  const user = users.find((u) => u.id === userId);

  if (!user) {
    res.redirect("/sign-in");
    return;
  }

  req.user = user;
}
```

## Middleware chains

Middleware chains run top-down — from the root of your app to the matched route. A middleware at `app/middleware.(ts/js)` runs on every request. A middleware at `app/dashboard/middleware.(ts/js)` runs on every request under `/dashboard`.

```
app/
├── dashboard/
│   ├── posts/
│   │   └── page.html   ← runs app/ and app/dashboard/ middleware
│   └── page.html       ← runs app/ and app/dashboard/ middleware
├── middleware.(ts/js)  ← runs on every request
└── page.html           ← runs app/ middleware only
```

If any middleware in the chain ends the response, the chain stops and the loader never runs.

## No `next` function

There is no `next` function. Returning from the middleware function is enough to continue to the next middleware or the loader.

```javascript
// app/middleware.(ts/js)
import type { LynnixRequest } from "lynnix";

export default function (req: LynnixRequest) {
  req.startedAt = Date.now();
  // returning continues the chain
}
```

## Async middleware

Middleware functions can be async. Lynnix awaits them before continuing the chain.

```javascript
// app/dashboard/middleware.(ts/js)
import type { LynnixRequest, LynnixResponse } from "lynnix";

export default async function (req: LynnixRequest, res: LynnixResponse) {
  const user = await db.users.findByToken(req.cookies.auth);

  if (!user) {
    res.redirect("/sign-in");
    return;
  }

  req.user = user;
}
```
