import { menu, toHtml } from "../utils.js";

export function GET() {
	return {
		seo: {
			title: "Project Structure | Lynnix Docs",
			description: "",
			image: "https://lynnix.vercel.app/images/banner.webp",
		},
		menu,
		toHtml,
		pathname: "/docs/project-structure",
		pager: {
			prev: {
				title: "Getting Started",
				path: "/docs/getting-started",
			},
			next: {
				title: "File Conventions",
				path: "/docs/file-conventions",
			},
		},
	};
}
