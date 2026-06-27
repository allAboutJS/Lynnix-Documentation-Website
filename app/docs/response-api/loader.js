import { menu, toHtml } from "../utils.js";

export function GET() {
	return {
		seo: {
			title: "Response API | Lynnix Docs",
			description: "",
			image: "https://lynnix.vercel.app/images/banner.webp",
		},
		menu,
		toHtml,
		pathname: "/docs/response-api",
		pager: {
			prev: {
				title: "Request API",
				path: "/docs/request-api",
			},
			next: {
				title: "Framework Integration",
				path: "/docs/framework-integration",
			},
		},
	};
}
