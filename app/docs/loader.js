import { menu, toHtml } from "./utils.js";

export function GET() {
	return {
		seo: {
			title: "Introduction | Lynnix Docs",
			description: "",
			image: "https://lynnix.vercel.app/images/banner.webp",
		},
		menu,
		toHtml,
		pathname: "/docs",
		pager: {
			next: {
				title: "Installation",
				path: "/docs/installation",
			},
		},
	};
}
