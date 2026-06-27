import { menu, toHtml } from "../utils.js";

export function GET() {
	return {
		seo: {
			title: "Framework Integration | Lynnix Docs",
			description: "",
			image: "https://lynnix.vercel.app/images/banner.webp",
		},
		menu,
		toHtml,
		pathname: "/docs/framework-integration",
		pager: {
			prev: {
				title: "Response API",
				path: "/docs/response-api",
			},
		},
	};
}
