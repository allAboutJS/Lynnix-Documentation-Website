import "dotenv/config";
import * as http from "node:http";
import { resolve } from "node:path";
import createLynnixApp from "lynnix";
import serveStatic from "serve-static";

let lynnixAppInstance = null;
const serve = serveStatic(resolve(process.cwd(), "./public"), { index: false });

async function getApp() {
	if (!lynnixAppInstance) {
		lynnixAppInstance = await createLynnixApp(resolve(process.cwd(), "./app"), {
			allowFnCalls: true,
			cache: { active: process.env.NODE_ENV === "production" },
		});
	}
	return lynnixAppInstance;
}

if (process.env.NODE_ENV !== "production") {
	const app = await getApp();

	const server = http.createServer((req, res) => {
		serve(req, res, () => {
			app(req, res);
		});
	});

	server.listen(process.env.PORT || 3000, () => {
		console.log(`Server is running on port ${process.env.PORT || 3000}`);
	});
}

export default async function handler(req, res) {
	const app = await getApp();

	serve(req, res, () => {
		app(req, res);
	});
}
