import { menu, toHtml } from "../docs/utils.js";

export function GET() {
	return {
		seo: {
			title: "Changelog | Lynnix",
			description: "",
			image: "https://lynnix.vercel.app/images/banner.webp",
		},
		menu,
		toHtml,
	};
}
