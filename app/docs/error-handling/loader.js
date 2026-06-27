import { menu, toHtml } from "../utils.js";

export function GET() {
	return {
		seo: {
			title: "Error Handling | Lynnix Docs",
			description: "",
			image: "https://lynnix.vercel.app/images/banner.webp",
		},
		menu,
		toHtml,
		pathname: "/docs/error-handling",
		pager: {
			prev: {
				title: "Fragments & HTMX",
				path: "/docs/fragments",
			},
			next: {
				title: "Request API",
				path: "/docs/request-api",
			},
		},
	};
}
