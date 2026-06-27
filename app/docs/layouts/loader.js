import { menu, toHtml } from "../utils.js";

export function GET() {
	return {
		seo: {
			title: "Layouts | Lynnix Docs",
			description: "",
			image: "https://lynnix.vercel.app/images/banner.webp",
		},
		menu,
		toHtml,
		pathname: "/docs/layouts",
		pager: {
			prev: {
				title: "Middleware",
				path: "/docs/middleware",
			},
			next: {
				title: "Fragments & HTMX",
				path: "/docs/fragments",
			},
		},
	};
}
