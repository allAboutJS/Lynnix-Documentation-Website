import { menu, toHtml } from "../utils.js";

export function GET() {
	return {
		seo: {
			title: "Installation | Lynnix Docs",
			description: "",
			image: "https://lynnix.vercel.app/images/banner.webp",
		},
		menu,
		toHtml,
		pathname: "/docs/installation",
		pager: {
			prev: {
				title: "Introduction",
				path: "/docs",
			},
			next: {
				title: "Getting Started",
				path: "/docs/getting-started",
			},
		},
	};
}
