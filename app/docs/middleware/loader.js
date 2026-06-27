import { menu, toHtml } from "../utils.js";

export function GET() {
	return {
		seo: {
			title: "Middleware | Mutor.js Docs",
			description: "",
			image: "https://lynnix.vercel.app/images/banner.webp",
		},
		menu,
		toHtml,
		pathname: "/docs/middleware",
		pager: {
			prev: {
				title: "Loaders",
				path: "/docs/loaders",
			},
			next: {
				title: "layouts",
				path: "/docs/layouts",
			},
		},
	};
}
