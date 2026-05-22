import { Hono } from "hono";

const HOMEPAGE_MARKDOWN = `# BioBuilder — Biochemical Kinetics Editor

BioBuilder is a web-based biochemical kinetics editor and simulator. Biochemists can build reaction networks, define rate laws and initial conditions, and run kinetic simulations directly in the browser.

## Resources

- App: https://biobuilder.app/
- Frontend repo: https://github.com/MarkAStevens04/cloudflare-kinetics-editor
- Backend repo: https://github.com/MarkAStevens04/Kinetics-Editor
- Contact: mark@biobuilder.app

## Workflow

1. Build a reaction diagram by adding species nodes and drawing edges between them.
2. Click an edge to open the reaction drawer and define rate laws and parameters.
3. Set initial values for each species.
4. Click "Simulate" to run the simulation and view concentration-vs-time plots.

## Endpoints

- \`GET /\` — homepage (HTML by default, Markdown via \`Accept: text/markdown\`)
- \`GET /api/\` — JSON app metadata
- \`GET /robots.txt\` — crawl rules
- \`GET /sitemap.xml\` — sitemap
`;

const app = new Hono<{ Bindings: Env }>();

app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

app.get("/", async (c) => {
	const accept = c.req.header("Accept") ?? "";
	if (accept.includes("text/markdown")) {
		return new Response(HOMEPAGE_MARKDOWN, {
			headers: {
				"Content-Type": "text/markdown; charset=utf-8",
				"x-markdown-tokens": String(Math.ceil(HOMEPAGE_MARKDOWN.length / 4)),
				Vary: "Accept",
			},
		});
	}
	return c.env.ASSETS.fetch(c.req.raw);
});

export default app;
