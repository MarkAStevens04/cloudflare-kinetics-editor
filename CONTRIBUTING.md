# Contributing to BioBuilder
Thank you SO MUCH for taking the time to contribute to this project!! 🎉🎉

The following is a set of guidelines for contributing to BioBuilder. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request! 😊

Feel free to view our [VISION.md](VISION.md) for the direction the project is hoping to take, and [ROADMAP.md](ROADMAP.md) for our plan to get there.


## Resources
Here's a few resources in case you get stuck while contributing. We're here to help! 

- **Discord**: Join our [DISCORD](https://discord.gg/GmsKryYDGN) server to discuss contributions, ask questions, and make some friends with like-minded people!
- **Email**: Send me an email at <mark@biobuilder.app> if you ever need anything, or have some ideas for improvement or feedback!! I'm immensely grateful you're thinking about contributing, and my goal is to respond to emails within 1 week. 

## Table of contents
- [Code of Conduct](#code-of-conduct)
- [Repo Structure](#repo-structure)
    - [BioBuilder's Repos](#biobuilders-repos)
    - [File Structure](#file-structure)
- [Getting Started](#getting-started)
    - [First time GitHub users](#first-time-github-users)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
    - [Project layout](#project-layout)
    - [Scripts](#scripts)
    - [Common pitfalls](#common-pitfalls)
    - [Where to get help](#where-to-get-help)
    - [Helpful Documentation](#helpful-documentation)
    - [Respond to feedback](#respond-to-feedback)
- [Request or Report Something!](#request-report-something)
    - [How do I submit a Bug report?](#how-do-i-submit-a-bug-report)
    - [How do I request a feature?](#how-do-i-request-a-feature)
    - [How do I report a security concern?](#how-do-i-report-a-security-concern)
- [Specific Feature Guides](#specific-feature-guides)
    - [Creating a new reaction type](#creating-a-new-reaction-type)


## Code of Conduct
See [CODE_OF_CONDUCT.md](https://github.com/MarkAStevens04/cloudflare-kinetics-editor/blob/main/CODE_OF_CONDUCT.md)!


## Repo Structure

This section is for orienting you around how this project is structured.


### BioBuilder's Repos
There are TWO repositories for biobuilder: The "frontend" (this repo!) which is what the user actually sees and interacts with, and the "backend", which is what computes our simulation. 

- [BioBuilder Frontend](https://github.com/MarkAStevens04/cloudflare-kinetics-editor)
- [BioBuilder Backend](https://github.com/MarkAStevens04/Kinetics-Editor)


### File Structure

Here's the general file structure for some of the most important components in the project: 

- `src/react-app/App.tsx`: Where all the components come together.
- `src/react-app/stores/store.ts`: App logic and states.
- `src/react-app/components/ProteinNode.tsx`: Code for nodes on the canvas
- `src/react-app/components/RxnEdge.tsx`: Wrapper for edges connecting nodes.
    - This is a wrapper for all the different edge types. Individual edge types are editable in "src/react-app/components/edges/" and tracked in "src/react-app/components/edges/index.ts". For help making a new edge type, see [Creating a new reaction type](#creating-a-new-reaction-type).
- `src/react-app/components/Drawer.tsx`: Code for rate law editor.
    - This is the Drawer that opens when you click on an edge.
- `src/react-app/components/SimulationDrawer.tsx`: Code for our "SIMULATE" button. 
    - Note that the actual simulation is performed in `store.ts` by the `fetchSimulationData` function, and sent to the [BioBuilder Backend](https://github.com/MarkAStevens04/Kinetics-Editor).

If you're ever confused where something lives, feel free to leave a comment on the relevant issue, or ask via any of the [resources](#resources).

# Getting started

This section gives a gentle introduction into getting your code up and running, and making your first edit!

Don't know what to code? Take a look at at the issues marked "[good first issue](https://github.com/MarkAStevens04/cloudflare-kinetics-editor/issues?q=state%3Aopen%20label%3A%22good%20first%20issue%22)" or "[🚨 High Priority](https://github.com/MarkAStevens04/cloudflare-kinetics-editor/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22%F0%9F%9A%A8%20High%20Priority%22)" to see what our project needs most! New to the project? Skim [VISION.md](VISION.md) for the *why* and
[ROADMAP.md](ROADMAP.md) for concrete things to pick up. Everyone is expected to
follow our [Code of Conduct](CODE_OF_CONDUCT.md).

> **🚨NOTE:🚨** 
If you struggle somewhere setting up, so will future contributors. Please edit this document with anything that helped you get set up or made your life easier!! 

## First time GitHub users

This sub-section will link to some great resources for helping you make your first ever contribution on GitHub!

- [THIS](https://www.youtube.com/watch?v=dLRA1lffWBw) youtube video gives a visual explanation of how to make your first contribution on GitHub. LLMs are also great resources for helping you get started.
- I recommend downloading [GitHub Desktop](https://github.com/apps/desktop) (free) to easily make changes to the code without using a terminal / command line interface.
- I recommend downloading [Visual Studio Code](https://code.visualstudio.com/) (free) to make your edits! 
- Join our [DISCORD](https://discord.gg/GmsKryYDGN) to join a community of passionate scientists, who are more than happy to help you make your first contribution.

## Prerequisites

BioBuilder's frontend is a React single-page app that runs on Cloudflare Workers, wired together by the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/).
The React app lives in `src/react-app/` and the Worker in `src/worker/index.ts`.
The heavy simulation work happens in a **separate backend repo**
([Kinetics-Editor](https://github.com/MarkAStevens04/Kinetics-Editor)). For most
frontend contributions you won't need to run it locally.

- **Node.js 20.19+ (Node 22 LTS recommended).** Vite 8 and React 19 will not run
  on older versions. We suggest [nvm](https://github.com/nvm-sh/nvm) to manage this.
- **npm** (ships with Node).
- **A Cloudflare account** (only needed if you deploy, which most contributors
  don't need to do).

## Setup
```bash
# 1. Fork on GitHub, then clone your fork
git clone https://github.com//cloudflare-kinetics-editor.git
cd cloudflare-kinetics-editor

# 2. Install dependencies
npm install

# 3. Generate Worker/binding types
npm run cf-typegen

# 4. Start the dev server
npm run dev
```

Open the URL Vite prints (default **http://localhost:5173**). You get hot module
replacement, and (thanks to the Cloudflare Vite plugin) the Worker runs in the
real Workers runtime (`workerd`) locally, so dev closely matches production.

## Project layout

| Path                        | What it is                                                    |
| --------------------------- | ------------------------------------------------------------ |
| `src/react-app/`            | The React SPA (UI, React Flow canvas, MUI charts, MathLive). |
| `src/worker/index.ts`       | The Hono Worker API (worker entry point).                    |
| `index.html`                | SPA HTML entry.                                              |
| `vite.config.ts`            | Vite config + the `@cloudflare/vite-plugin`.                 |
| `wrangler.json`             | Worker config: name, bindings, compat date, SPA routing.     |
| `worker-configuration.d.ts` | Generated binding types (via `npm run cf-typegen`).          |
| `dist/client/`              | Build output for the SPA assets (generated. Never edit).    |

## Scripts

| Command             | Purpose                                                          |
| ------------------- | ---------------------------------------------------------------- |
| `npm run dev`       | Local dev server (Vite + Workers runtime, HMR).                 |
| `npm run build`     | Type-check all projects (`tsc -b`) and build to `dist/`.        |
| `npm run preview`   | Build, then serve the built output (closest to production).     |
| `npm run check`     | Type-check + build + `wrangler deploy --dry-run`. **Run this before opening a PR.** |
| `npm run lint`      | Run ESLint over the repo.                                       |
| `npm run cf-typegen`| Regenerate binding/env types from `wrangler.json`.             |
| `npm run deploy`    | Deploy to Cloudflare (maintainers only).         |

Before opening a PR, please make sure `npm run check` and `npm run lint` both pass.

## Common pitfalls

- **Don't use `wrangler dev`.** The dev command here is `npm run dev` (which runs
  `vite`). `wrangler dev` bypasses Vite and won't behave the way the project
  expects. See [Wrangler vs. Vite](https://developers.cloudflare.com/workers/development-testing/wrangler-vs-vite/).

- **`wrangler.json`, not `.jsonc`.** This project uses plain JSON, so **comments
  are not allowed** in the config file (adding one will break `wrangler`).

- **Regenerate types after touching `wrangler.json`.** If you add or change a
  binding, run `npm run cf-typegen` (updates `worker-configuration.d.ts`) or your
  `Env` type will be stale and TypeScript will complain in confusing ways.

- **`tsc -b` uses project references.** Types are split across
  `tsconfig.app.json`, `tsconfig.node.json`, and `tsconfig.worker.json`. If a
  type change doesn't seem to "take," run `npm run build` to rebuild the
  referenced projects.

- **The Worker runs in `workerd`, not Node.** `nodejs_compat` is enabled, but not
  every Node API is available. Confirm support before reaching for a Node
  built-in. See [Node.js compatibility](https://developers.cloudflare.com/workers/runtime-apis/nodejs/).

- **SPA routing is already configured.** `not_found_handling` is set to `single-page-application` and `run_worker_first` is `["/"]`, so the Worker handles `/` and unmatched client routes fall back to `index.html`. If you add new API routes, make sure they don't collide with client-side routes. See [SPA routing](https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/).

- **"Simulate" not working locally?** Simulation is served by the separate [backend](https://github.com/MarkAStevens04/Kinetics-Editor). Frontend-only work usually doesn't require running it. Check with a maintainer if your change touches the simulation flow.

- **Don't run `npm run deploy`.** Deployment to production is handled by
  maintainers/CI. The Worker `name` in `wrangler.json` points at the live app. Use `npm run check` (which does a safe `--dry-run`) to validate your changes instead.

- **Port 5173 already in use?** Another Vite process is likely running. Stop it, or open whichever port Vite prints instead.

## Where to get help

- 💬 [Discord](https://discord.gg/GmsKryYDGN) - fastest way to ask questions.
- 🐛 [Issues](https://github.com/MarkAStevens04/cloudflare-kinetics-editor/issues)
  and [Discussions](https://github.com/MarkAStevens04/cloudflare-kinetics-editor/discussions)
  for bugs and ideas.
- 📧 [mark@biobuilder.app](mailto:mark@biobuilder.app) - reach the maintainer directly.

## Helpful Documentation

- [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/)
  · [Wrangler config](https://developers.cloudflare.com/workers/wrangler/configuration/)
  · [Static assets / SPA routing](https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/)
- [Hono](https://hono.dev/) (Worker API framework)
- [React Flow / @xyflow/react](https://reactflow.dev/) (the reaction-diagram canvas)
- [Supabase JS client](https://supabase.com/docs/reference/javascript/introduction)
- [Vite](https://vite.dev/) · [React](https://react.dev/)



## Respond to feedback

CONGRATS!!! 👏 You've just made your first contribution to BioBuilder!! But we're not done yet. Before we put your changes on the website, someone will review your code and give feedback. Don't be disappointed if your change is rejected at first! You learn to be a better contributor by contributing more. Keep trying and you'll become a pro in no time! 

Right now, your code exists as a "Pull Request" (PR). You can see this PR in the "Pull Requests" tab of the BioBuilder repo. You'll get notifications once someone responds to this pull request.

We want your help improving BioBuilder, and our goal is to make your code changes materialize! But big projects are bug magnets, and it's best to have a second pair of eyes looking over the code we add. Most pull requests aren't accepted at first, and require a round or two of revisions. Our goal is to get your code on the website, so we'll do our best to give feedback quickly and clearly, but please ask questions if something is unclear.

We will make comments on your code and give feedback. This is called a "code review". These comments and feedback will appear underneath your pull request.

Once your code is approved, it will be merged onto the main branch, and your code will be public!

Huge congrats on making your first contribution, and thanks for improving BioBuilder!! This platform wouldn't be possible without amazing contributors like you ❤️


# Request or Report Something!

This section explains how to report bugs and request new features. 

## How do I submit a Bug report?

The best person to fix a bug is YOU! You're more qualified than you think, and if you see something that you can improve, you should do it! But if you just want to report a bug, you can do that following this guide.

Bugs are tracked as [GitHub issues](https://guides.github.com/features/issues/). Create an issue and fill in the required information. The more detail you provide, the quicker we can resolve it! You can also do a quick search to see if someone else has already documented this issue. 

Go to the PUBLIC repository (not your fork if you've created a fork), go to the "Issues" tab, and click "New Issue". There will be a template for "Bug Reports" for you to fill in.

## How do I request a feature?

The best person to implement a feature is YOU! You're more qualified than you think, and if you see something that you can improve, you should do it! But if you just want to request a feature, you can do that following this guide.

Feature Requests are tracked as [GitHub issues](https://guides.github.com/features/issues/). Create an issue and fill in the required information. The more detail you provide, the quicker we can implement it! You can also do a quick search to see if someone else has already suggested the feature. 

Go to the PUBLIC repository (not your fork if you've created a fork), go to the "Issues" tab, and click "New Issue". There will be a template for "Feature Requests" for you to fill in.

## How do I report a security concern?

See [SECURITY.md](SECURITY.md) for a guide on reporting security vulnerabilities.

# Specific Feature Guides

This section acts as a guide on implementing specific advanced features.

## Creating a new reaction type

This section describes how to implement a new reaction type. We currently have Michaelis Menten reactions and Mass Action reactions, and are looking to expand into more. This is a difficult feature to code, and we recommend making a couple of smaller changes before going for this one. Take a look at at the issues marked "[good first issue](https://github.com/MarkAStevens04/cloudflare-kinetics-editor/issues?q=state%3Aopen%20label%3A%22good%20first%20issue%22)" if you want ideas on what changes to make! 

Create a new file in [`src\react-app\components\edges`](https://github.com/MarkAStevens04/cloudflare-kinetics-editor/tree/main/src/react-app/components/edges) called something like `RXN.tsx`, where RXN is the name of your new reaction type.

Copy the code from `Custom.tsx` and paste into your new edge. Search through the file and replace the following with a more accurate name for your edge type:
1. `CustomEdgeType` -> `RXNEdgeType`
2. `CustomEdge` -> `RXNEdge`
3. `CustomDrawerInfo` -> `RXNDrawerInfo`

In your RXNEdgeType, define the internal name for your edge type by changing `'custom'` to the name of your edge. It would look something like:

```
export type RXNEdgeType = Edge<{ 
    label: string; 
    // toggleDrawer: (id: string) => void;
    rate_law: string;
    rate_type: string; 
}, 'rxn'>;
```

Modify index.ts to include your edge! Copy the block for the CustomEdge, and replace with whatever names you chose for above. You'll also add the following pieces:
1. `export type AppEdge ...` Make sure to add your EdgeType here
2. `export const edgeTypes ...` Make sure to use the internal name you defined above.

Go to `Drawer.tsx` and make the following modifications:
1. Add information about your edge in the `reactionTypes` array. The id is the id for your edge type. The `label` is what your edge will look like in the dropdown menu, and the `desc` is what the tooltip will show on hover. Change `implemented ` to true once you have finished implementing your edge.
2. (optional) Add custom HTML that shows in the drawer for your edge! First import your `RXNDrawerInfo` at the top of `Drawer.tsx`. Then, in the section that says `Include rate type specific options`, add an option for your custom edge! This allows you to display some custom HTML for your edge. 

(Optional) Go to `store.ts` and modify `predictRxnType`. Modify how we infer the rate type based on your specific reaction. Think, what kinds of inputs and outputs are unique to this reaction type? Make sure you're not overlapping too much with other reaction types.