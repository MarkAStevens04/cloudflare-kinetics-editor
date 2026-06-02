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
- \`GET /.well-known/api-catalog\` — RFC 9727 API catalog
- \`GET /.well-known/agent-skills/index.json\` — agent skills discovery index
`;

const API_CATALOG = {
	linkset: [
		{
			anchor: "https://kinetics-editor.vercel.app/api",
			"service-doc": [
				{
					href: "https://github.com/MarkAStevens04/Kinetics-Editor#readme",
					type: "text/html",
				},
			],
			status: [
				{
					href: "https://kinetics-editor.vercel.app/api/health",
					type: "application/json",
				},
			],
		},
	],
};

const USE_BIOBUILDER_SKILL_URL =
	"/.well-known/agent-skills/use-biobuilder/SKILL.md";

const USE_BIOBUILDER_SKILL_MD = `---
name: use-biobuilder
description: Help a user model biochemical reaction kinetics in BioBuilder, the web-based editor at https://biobuilder.app/. Use when the user wants to simulate enzyme reactions, build reaction networks, or predict concentration-vs-time profiles for biochemical systems without writing ODE code.
---

# Using BioBuilder for Biochemical Kinetics

BioBuilder (https://biobuilder.app/) is a browser-based editor and simulator for biochemical reaction networks. It is aimed at biologists and biochemists who want to run kinetic simulations without writing custom ODE code.

## When this skill applies

The user is trying to:

- Model a biochemical reaction or metabolic pathway over time.
- Predict concentrations of reactants and products under defined initial conditions.
- Test how rate constants, enzyme kinetics, or initial concentrations change a system's behavior.
- Build a small-to-medium reaction network interactively rather than programmatically.

## Inputs the user needs

1. **Reaction diagrams.** Which species are involved and which reactions connect them. Common sources: KEGG, BioCyc, ENZYME, BRENDA, BiGG.
2. **Rate laws and parameters.** Rate constants for each reaction. Common sources: Sabio-RK, BioNumbers.
3. **Initial conditions.** Starting concentrations for each species, grounded in the user's experimental system.

Help the user collect these before opening the editor — entering them is faster when they are already structured.

## Workflow in the UI

1. Open https://biobuilder.app/.
2. Create the reaction diagram: add a node per species, draw an edge between two species for each reaction.
3. Click an edge to open the reaction drawer. Set the rate law and any parameters (mass action, Michaelis–Menten, custom expressions).
4. Set initial values for each species.
5. Click "Simulate" in the top-right corner. Concentration-vs-time plots appear in the results panel.

## Limitations

- BioBuilder is UI-driven. There is no public natural-language or programmatic model-building API. Prepare structured inputs for the user, then walk them through entry.
- Simulation runs against a separate backend at https://kinetics-editor.vercel.app/ (source: https://github.com/MarkAStevens04/Kinetics-Editor). Backend health: https://kinetics-editor.vercel.app/api/health.
- Rate-law validation is best-effort; double-check that rate laws make physical sense before trusting results.

## Feedback

mark@biobuilder.app or https://tally.so/r/VLYDpa
`;

const SKILLS_SCHEMA =
	"https://schemas.agentskills.io/discovery/0.2.0/schema.json";

let cachedSkillDigest: string | null = null;
async function getUseBiobuilderDigest(): Promise<string> {
	if (cachedSkillDigest) return cachedSkillDigest;
	const buf = new TextEncoder().encode(USE_BIOBUILDER_SKILL_MD);
	const hash = await crypto.subtle.digest("SHA-256", buf);
	const hex = Array.from(new Uint8Array(hash))
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
	cachedSkillDigest = `sha256:${hex}`;
	return cachedSkillDigest;
}

const app = new Hono<{ Bindings: Env }>();

app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

app.get("/.well-known/api-catalog", () => {
	return new Response(JSON.stringify(API_CATALOG, null, 2), {
		headers: {
			"Content-Type": "application/linkset+json",
		},
	});
});

app.get("/.well-known/agent-skills/index.json", async (c) => {
	const digest = await getUseBiobuilderDigest();
	return c.json({
		$schema: SKILLS_SCHEMA,
		skills: [
			{
				name: "use-biobuilder",
				type: "skill-md",
				description:
					"Help a user model biochemical reaction kinetics in BioBuilder, the web-based editor at https://biobuilder.app/.",
				url: USE_BIOBUILDER_SKILL_URL,
				digest,
			},
		],
	});
});

app.get(USE_BIOBUILDER_SKILL_URL, () => {
	return new Response(USE_BIOBUILDER_SKILL_MD, {
		headers: {
			"Content-Type": "text/markdown; charset=utf-8",
		},
	});
});

const HOMEPAGE_LINK_HEADER = [
	'</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
	'</.well-known/agent-skills/index.json>; rel="service-meta"; type="application/json"',
	'<https://github.com/MarkAStevens04/cloudflare-kinetics-editor#readme>; rel="service-doc"; type="text/html"',
	'<https://github.com/MarkAStevens04/Kinetics-Editor#readme>; rel="service-doc"; type="text/html"',
	'</sitemap.xml>; rel="sitemap"; type="application/xml"',
].join(", ");

app.get("/", async (c) => {
	const accept = c.req.header("Accept") ?? "";
	if (accept.includes("text/markdown")) {
		return new Response(HOMEPAGE_MARKDOWN, {
			headers: {
				"Content-Type": "text/markdown; charset=utf-8",
				"x-markdown-tokens": String(Math.ceil(HOMEPAGE_MARKDOWN.length / 4)),
				Vary: "Accept",
				Link: HOMEPAGE_LINK_HEADER,
			},
		});
	}
	const assetRes = await c.env.ASSETS.fetch(c.req.raw);
	const res = new Response(assetRes.body, assetRes);
	res.headers.set("Link", HOMEPAGE_LINK_HEADER);
	res.headers.set("Vary", "Accept");
	return res;
});

export default app;
