# Layouts

Layouts let you define a reusable HTML shell and inject page content into it. They are a Mutor.js feature that Lynnix makes available across your entire application. So I suggest you visit the [Mutor.js documentation](https://mutorjs.vercel.app/docs/components-layouts#layouts) to learn more about layouts.

## Declaring a layout

Any template that starts with `\{{# layout "name" }}` is registered as a named layout at startup. The `\{{ ::slot }}` tag marks where page content gets injected.

```html
<!-- app/dashboard/layout.html -->
\{{# layout "dashboard_layout" }}

<!doctype html>
<html lang="en">
  <head>
    <title>\{{ data.title }}</title>
  </head>
  <body>
    <aside><!-- sidebar --></aside>
    <main>\{{ ::slot }}</main>
  </body>
</html>
```

## Using a layout

Any page or fragment that starts with `\{{# use "name" }}` is rendered inside that layout.

```html
<!-- app/dashboard/page.html -->
\{{# use "dashboard_layout" }}

<h1>Welcome, \{{ data.user.name }}</h1>
```

The layout and the page share the same data context. `\{{ data.title }}` resolves correctly in both.

## Layout files

The filename does not matter to Lynnix — `layout.html` is just a convention. What matters is the `\{{# layout }}` declaration inside the file. Lynnix scans your entire `app/` directory at startup and registers every file that contains a `\{{# layout }}` directive.

You can place layout files anywhere inside your `app/` directory:

```
app/
├── components/
│   └── layouts/
│       ├── root.html        \{{# layout "root" }}
│       └── dashboard.html   \{{# layout "dashboard" }}
├── dashboard/
│   └── page.html            \{{# use "dashboard" }}
└── page.html                \{{# use "root" }}
```

## Nested layouts

Layouts can extend other layouts. A layout uses `\{{# use "name" }}` exactly like a page template does.

```html
<!-- root layout -->
\{{# layout "root" }}
<!doctype html>
<html>
  <body>\{{ ::slot }}</body>
</html>
```

```html
<!-- dashboard layout extending root -->
\{{# layout "dashboard" }}
\{{# use "root" }}

<div class="sidebar"><!-- nav --></div>
<main>\{{ ::slot }}</main>
```

```html
<!-- page using dashboard layout -->
\{{# use "dashboard" }}

<h1>\{{ data.title }}</h1>
```

Mutor resolves the full chain and rejects circular dependencies at registration time.

## Layout rules

- `\{{# layout "name" }}` must be the very first line of the file.
- `\{{# use "name" }}` must appear at the top of the template, after the layout declaration if any.
- `\{{ ::slot }}` marks where child content is injected. A layout with no `\{{ ::slot }}` discards child content.
- Directives are not expressions — they cannot be conditional or dynamic.
- Missing layouts throw an error at startup.
