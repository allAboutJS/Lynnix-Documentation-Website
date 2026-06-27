import { menu, toHtml } from "../utils.js";

export function GET() {
	return {
		seo: {
			title: "Loaders | Lynnix Docs",
			description: "",
			image: "https://lynnix.vercel.app/images/banner.webp",
		},
		menu,
		toHtml,
		pathname: "/docs/loaders",
		pager: {
			prev: {
				title: "Routing",
				path: "/docs/routing",
			},
			next: {
				title: "Middleware",
				path: "/docs/middleware",
			},
		},
	};
}
