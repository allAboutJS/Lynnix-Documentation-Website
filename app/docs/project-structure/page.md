# Project Structure

A Lynnix application lives inside a single directory — conventionally named `app/`. The filesystem is your router. Every subdirectory is a route segment. The files inside each directory determine how that route behaves.

```
app/
├── components/
│   └── header.html
├── dashboard/
│   ├── posts/
│   │   ├── [slug]/
│   │   │   └── loader.js
│   │   ├── loader.js
│   │   └── page.html
│   ├── layout.html
│   ├── loader.js
│   ├── middleware.js
│   ├── not-found.html
│   └── page.html
├── loader.js
├── not-found.html
└── page.html
```

## The app directory

The path you pass to `createLynnixApp` is the root of your application. Lynnix scans it at startup, registers every route it finds, and begins serving requests. You can name this directory anything — `app/`, `src/`, `views/`, but `app/` is the convention (for this documentation website at least).

## Reserved files

Lynnix recognises a fixed set of filenames in any route directory. These are the files it looks for when handling a request:

| File | Purpose |
| --- | --- |
| `page.html` | Full-page HTML response for regular requests |
| `fragment.html` | Partial HTML response for htmx requests |
| `loader.js` / `loader.ts` | HTTP method handlers and data loading |
| `middleware.js` / `middleware.ts` | Route-level middleware |
| `not-found.html` | 404 page for regular requests |
| `fragment.not-found.html` | 404 fragment for htmx requests |
| `error.html` | Error page for regular requests |
| `fragment.error.html` | Error fragment for htmx requests |

> When you use middleware or loader with a `.ts` extension you must make sure your environment is set up to compile TypeScript files, otherwise it would result in errors. If you wish to use TypeScript in your middleware or loader, I highly recommend using the `tsx` package. I can vouch for its reliability, I used it myself while testing Lynnix's prototype.

Any file that is not in this list is invisible to the router. You can place components, layouts, utilities, and shared templates anywhere inside your `app/` directory and Lynnix will not treat them as routes.

## Nesting

Route directories nest freely. A file at `app/dashboard/posts/page.html` maps to `/dashboard/posts`. There is no depth limit.

Middleware and error boundaries also nest. A `middleware.js` at `app/dashboard/middleware.js` runs for every request under `/dashboard`. A `not-found.html` at `app/dashboard/not-found.html` catches 404s for any unmatched route under `/dashboard`. See [Middleware](/docs/middleware) and [Error Handling](/docs/error-handling) for details.

## Collocating non-route files

Components, layouts, and shared partials can live anywhere inside your `app/` directory. A common convention is to keep them in a `components/` subdirectory at the root of `app/`:

```
app/
├── components/
│   ├── header.html
│   ├── footer.html
│   └── card.html
├── about/
│   └── page.html
└── page.html
```

Since `components/` contains no reserved files, Lynnix ignores it as a route and treats its contents as free-form templates you can include from anywhere.
