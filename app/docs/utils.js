import MarkdownIt from "markdown-it";

const markdown = new MarkdownIt({ html: true });

export const menu = [
	{ title: "Introduction", path: "/docs" },
	{ title: "Installation", path: "/docs/installation" },
	{ title: "Getting Started", path: "/docs/getting-started" },
	{ title: "Project Structure", path: "/docs/project-structure" },
	{ title: "File Conventions", path: "/docs/file-conventions" },
	{ title: "Routing", path: "/docs/routing" },
	{ title: "Loaders", path: "/docs/loaders" },
	{ title: "Middleware", path: "/docs/middleware" },
	{ title: "Layouts", path: "/docs/layouts" },
	{ title: "Fragments & htmx", path: "/docs/fragments" },
	{ title: "Error Handling", path: "/docs/error-handling" },
	{ title: "Request API", path: "/docs/request-api" },
	{ title: "Response API", path: "/docs/response-api" },
	{ title: "Framework Integration", path: "/docs/framework-integration" },
];

export const toHtml = (src) => {
	const transformed = markdown.render(src);
	return transformed;
};
