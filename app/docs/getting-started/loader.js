import { menu, toHtml } from "../utils.js";

export function GET() {
	return {
		seo: {
			title: "Getting Started | Lynnix Docs",
			description: "",
			image: "https://lynnix.vercel.app/images/banner.webp",
		},
		menu,
		toHtml,
		pathname: "/docs/getting-started",
		pager: {
			prev: {
				title: "Installation",
				path: "/docs/installation",
			},
			next: {
				title: "Project Structure",
				path: "/docs/project-structure",
			},
		},
	};
}
