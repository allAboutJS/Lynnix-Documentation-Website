import { menu, toHtml } from "../utils.js";

export function GET() {
	return {
		seo: {
			title: "Fragments & HTMX | Lynnix Docs",
			description: "",
			image: "https://lynnix.vercel.app/images/banner.webp",
		},
		menu,
		toHtml,
		pathname: "/docs/fragments",
		pager: {
			prev: {
				title: "Layouts",
				path: "/docs/layouts",
			},
			next: {
				title: "Error Handling",
				path: "/docs/error-handling",
			},
		},
	};
}
