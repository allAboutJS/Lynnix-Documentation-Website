import { menu, toHtml } from "../utils.js";

export function GET() {
	return {
		seo: {
			title: "Routing | Lynnix Docs",
			description: "",
			image: "https://lynnix.vercel.app/images/banner.webp",
		},
		menu,
		toHtml,
		pathname: "/docs/routing",
		pager: {
			prev: {
				title: "File Conventions",
				path: "/docs/file-conventions",
			},
			next: {
				title: "Loaders",
				path: "/docs/loaders",
			},
		},
	};
}
