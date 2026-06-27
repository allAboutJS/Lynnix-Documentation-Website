import { menu, toHtml } from "../utils.js";

export function GET() {
	return {
		seo: {
			title: "Request API | Lynnix Docs",
			description: "",
			image: "https://lynnix.vercel.app/images/banner.webp",
		},
		menu,
		toHtml,
		pathname: "/docs/request-api",
		pager: {
			prev: {
				title: "Fragments & HTMX",
				path: "/docs/fragments",
			},
			next: {
				title: "Response API",
				path: "/docs/response-api",
			},
		},
	};
}
