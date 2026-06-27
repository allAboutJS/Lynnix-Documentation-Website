import { menu, toHtml } from "../utils.js";

export function GET() {
	return {
		seo: {
			title: "File Conventions | Lynnix Docs",
			description: "",
			image: "https://lynnix.vercel.app/images/banner.webp",
		},
		menu,
		toHtml,
		pathname: "/docs/file-conventions",
		pager: {
			prev: {
				title: "Project Structure",
				path: "/docs/project-structure",
			},
			next: {
				title: "Routing",
				path: "/docs/routing",
			},
		},
	};
}
