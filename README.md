# Build
Locally, run `npx vite`
To deploy, run 
```
npm run build
npm run deploy
```


# UI Improvements:
### Multi-Highlight
- Only have to highlight part of a node to select it
- More beautiful selections
- On Highlight, also highlight edges

### Camera controls
- Switch to Canva defaults 
    - shift + scroll = left / right 
    - ctrl + scroll = in / out
    - regular scroll = up / down

### Selection
- Bar Pops out on right allowing you to edit node further
- Click once = selection
    - After selection, short click = edit text (no more movement)
    - After selection, long click = move node (MAYBE NOT THIS?? Lowkey unintuitive. Just after selection, any click on text = edit text)
    - Maybe after one selection, holding on certain section allows you to move whole thing, but holding on text doesn't?
- Click once => NO MORE DRAGGING!

- COULD make it so that clicking the text -> edit the text, click the side -> move the node

- Corresponding line on chart should highlight as well

### Basic Controls
- Ctrl-Z to undo
- Ctrl + C / Ctrl + V 
    - Multi-node selection, AND individual nodes / edges
- Delete AND Backspace allow you to delete stuff
- Clicking "Enter" after editing name closes selection

- Highlight and edit multiple connections simultaneously!


### Species
- Add different reactants
- Color corresponds to reactant type
- Make it possible to rescale
    - Diff color palettes depending on type of species
    - Diff shapes for diff species
- Z index saved. So as you click, all Z-indices for edges come up
- When adding multiple nodes, if a node is deleted, roll your index back by one so you get a new node that was the same color as the one you deleted!

### Simulation
- After simulating, change width and color of reaction networks

### Nice little touches
- Contextual zoom (zooming out shows less detailed stuff https://reactflow.dev/examples/interaction/contextual-zoom)

- Auto-organize button to make nodes aesthetically pleasing

- Aesthetic Gradients (https://reactflow.dev/examples/styling/turbo-flow)


### Project Charter Document
- What do we want out of this project?
    - * AMAZING DEFAULT OPTIONS! The program should think for you as much as possible.
    - Make it as non-intimidating as possible for biologists / ppl who don't know reaction mechanisms very well.
    - Speed
    - Intuitive
    - Exactly what you need (no more, no less)
    - Look like reaction diagrams you see online



### Right click
- Allows you to add new node

### Edge Editing
- Sources can be both inputs OR outputs
- Click edge, easily swap direction
- Edges have arrows on them denoting direction
- Can change where edge ends at (look at reconnectable attr https://reactflow.dev/api-reference/types/edge)
- Copy and paste edges
 

### Decoration
- Background is little hexagon intersections for organic chemistry

### Optimize based on constraints!
- Set a desired threshhold for different proteins (want protein X to be > 100, reactant Y <10, etc.) then it automatically helps you choose parameters to optimzie those constraints!
- Think from the perspective of a synthetic biologist. They want to make something happen, but might not know what levers to turn. Our algorithm could tell them what levers to turn!

# React + Vite + Hono + Cloudflare Workers
[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/templates/tree/main/vite-react-template)

This template provides a minimal setup for building a React application with TypeScript and Vite, designed to run on Cloudflare Workers. It features hot module replacement, ESLint integration, and the flexibility of Workers deployments.

![React + TypeScript + Vite + Cloudflare Workers](https://imagedelivery.net/wSMYJvS3Xw-n339CbDyDIA/fc7b4b62-442b-4769-641b-ad4422d74300/public)

<!-- dash-content-start -->

🚀 Supercharge your web development with this powerful stack:

- [**React**](https://react.dev/) - A modern UI library for building interactive interfaces
- [**Vite**](https://vite.dev/) - Lightning-fast build tooling and development server
- [**Hono**](https://hono.dev/) - Ultralight, modern backend framework
- [**Cloudflare Workers**](https://developers.cloudflare.com/workers/) - Edge computing platform for global deployment

### ✨ Key Features

- 🔥 Hot Module Replacement (HMR) for rapid development
- 📦 TypeScript support out of the box
- 🛠️ ESLint configuration included
- ⚡ Zero-config deployment to Cloudflare's global network
- 🎯 API routes with Hono's elegant routing
- 🔄 Full-stack development setup
- 🔎 Built-in Observability to monitor your Worker

Get started in minutes with local development or deploy directly via the Cloudflare dashboard. Perfect for building modern, performant web applications at the edge.

<!-- dash-content-end -->

## Getting Started

To start a new project with this template, run:

```bash
npm create cloudflare@latest -- --template=cloudflare/templates/vite-react-template
```

A live deployment of this template is available at:
[https://react-vite-template.templates.workers.dev](https://react-vite-template.templates.workers.dev)

## Development

Install dependencies:

```bash
npm install
```

Start the development server with:

```bash
npm run dev
```

Your application will be available at [http://localhost:5173](http://localhost:5173).

## Production

Build your project for production:

```bash
npm run build
```

Preview your build locally:

```bash
npm run preview
```

Deploy your project to Cloudflare Workers:

```bash
npm run build && npm run deploy
```

Monitor your workers:

```bash
npx wrangler tail
```

## Additional Resources

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://reactjs.org/)
- [Hono Documentation](https://hono.dev/)
