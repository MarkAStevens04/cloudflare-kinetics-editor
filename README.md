[![N|Solid](src/react-app/assets/Bio_Builder_Banner.png)](https://biobuilder.app/)

<div align="center">

[![N|Solid](https://img.shields.io/website?url=https%3A%2F%2Fbiobuilder.app%2F&label=frontend)](https://biobuilder.app/)
[![N|Solid](https://img.shields.io/website?url=https%3A%2F%2Fkinetics-editor.vercel.app%2Fapi%2Fhealth&label=backend&cacheSeconds=600)](https://kinetics-editor.vercel.app/api/health)
![N|Solid](https://img.shields.io/github/check-runs/MarkAStevens04/cloudflare-kinetics-editor/main?label=build)
[![N|Solid](https://img.shields.io/badge/github-backend-blue?logo=github)](https://github.com/MarkAStevens04/Kinetics-Editor)


[![N|Solid](https://badgen.net/badge/icon/discord?icon=discord&label)](https://discord.gg/GmsKryYDGN) 
[![N|Solid](https://img.shields.io/badge/-mark@biobuilder.app-blue?logo=gmail&label=Email)](mailto:mark@biobuilder.app)

[![N|Solid](https://img.shields.io/badge/Give%20us%20feedback!!-magenta
)](https://tally.so/r/VLYDpa)

</div>


# Basic Overview

BioBuilder is a web-based biochemical kinetics editor and simulator! 🧪✨ Built specifically to run simulations easily and quickly. 

# Philosophy

Biochemical kinetics allows you to predict the future in biology. 🔮 It allows you to know exactly which chemicals and how much will be produced, given some set of initial conditions.

We believe that biochemists shouldn't need to be computer scientists to benefit from this technique. BioBuilder bridges the gap between biologists and computers, and allows you to start running simulations NOW!

**There are two repos**: The frontend (this repo) to interface with scientists, and the backend ([HERE](https://github.com/MarkAStevens04/Kinetics-Editor)) to run our simulations.

This app was originally built for PHY426.

Go to https://biobuilder.app to start using the software now!


# Contributing

Want to see a new feature on the site? Is there a small tweak that would make the site less frustrating? The best person to make the change is *YOU*! You don't need to be an expert computer scientist to make a meaningful impact. Whether you're a seasoned open-source veteran, or this is your first contribution, we always welcome any help we can get, and we've created a guide to help make it easy for you to get started.

See `CONTRIBUTING.md` for a guide on how to get started making your first contributions.

# How to use

Go to https://biobuilder.app to start using the software now!

## 1. Setting up your simulation
The hardest part of biochemical kinetics isn't performing the simulation: it's finding the right parameters. While we plan on adding integrations with existing databases, for now, you will need to add your own biochemical kinetic parameters. The wikipedia page for [Metabolic Network Modelling](https://en.wikipedia.org/wiki/Metabolic_network_modelling) is a helpful guide if you're just getting started with biochemical kinetics.

Your model needs 3 outside components:
- Reaction Diagrams
- Rates & Parameters
- Initial conditions

**Reaction Diagrams** can be found from a number of free online databases, including:
- [KEGG](https://www.kegg.jp/)
- [BioCyc](https://biocyc.org/)
- [ENZYME](https://enzyme.expasy.org/)
- [BRENDA](https://www.brenda-enzymes.info/)
- [BiGG](http://bigg.ucsd.edu/)

**Rates & Parameters** are evaluated from real experiments scientists have performed. One of the most well-known databases to gather these kinetic rate parameters is [Sabio-RK](https://sabiork.h-its.org/). Another helpful resource is [BioNumbers](https://bionumbers.hms.harvard.edu/search.aspx).

**Initial Conditions** depend on YOUR experiment! If you plan on going into the lab to do some work, use plausible information about your system ([BioNumbers](https://bionumbers.hms.harvard.edu/search.aspx) is helpful for this). If you're doing some theoretical work, use numbers that closely resemble your system wherever possible, or run multiple simulations with different values to find the ones that are most realistic!

## 2. Making your simulation

After you know your **diagrams**, **parameters**, and **initial conditions**, it's time to start putting them in the simulation! Here's a quick guide on how:

- Create the reaction diagram (add nodes, draw edges to represent reactions)
- Edit reaction parameters (click each edge to open the reaction drawer. Each edge needs to have a rate law.)
- Edit initial values (in the reaction editor, you can set the initial values of each reactant!)


## 3. Running your simulation
Now you've set up your simulation, it's time to run it! Click "SIMULATE" in the top right corner, and voila! We've performed your simulation!


# Feedback

We LOVE feedback, and we're always looking for ways to improve the platform! Feel free to shoot me an email at <mark@biobuilder.app> with any suggestions or feedback, and I'd be happy to respond.

You can also fill out [THIS](https://tally.so/r/VLYDpa) feedback form!


# Build
Locally, run `npx vite`

To deploy, run 
```
npm run build
npm run deploy
```

# Future Work

As with any project, ideas can quickly outpace capacity. Here's some ideas of what we want to do!

## 1. UI-Improvements

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
    - Multi-node selection, AND individual nodes / ed
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
- Allow back and forth with reactions! Make them reversible if desired.
    - See https://reactflow.dev/examples/nodes/easy-connect for details\

- Different types / names
    - Protein, Enzyme / Catalyst
    - Ligand, Substrate / Metabolite
    - Complex
    - DNA, RNA, DNA-Binding Protein, etc.


### User stories!
- Come up with some user stories! 
- Who are the people you want to use this app? What would they use it for?

### Simulation
- After simulating, change width and color of reaction networks

### Nice little touches
- Contextual zoom (zooming out shows less detailed stuff https://reactflow.dev/examples/interaction/contextual-zoom)

- Auto-organize button to make nodes aesthetically pleasing

- Aesthetic Gradients (https://reactflow.dev/examples/styling/turbo-flow)

- Example systems! So users can quickly get up and running and see the end product

- Opacity of graph lowers so you can see through (same with rates and stuff)?? Explore

- Tree with your rates & nodes & whatever. Possibly look more like fusion?
    - Little search bar or something on the side so you can search for a protein in your reaction.

- Generate a new node where the user is already looking

- make text boxes on reaction line smaller, make text boxes on reaction line editable
    - Possibly make text bigger as you zoom out? Not 100% sure.

- Make lines draggable. Maybe even just move text boxes around, line follows.

- Right click, can edit edit nodes. Can edit their colors.

- Show that buttons in rate editor are clickable! Meant to click buttons not type

- Text at top that says "SIMULATE" should say "SIMULATING" when we run.

- Little banner that pops up at top of page when a new build is deployed and the user is still on the old version. Something like "We just launched an update! Refresh the page to see the changes <3"


### Parameters & Functions
- Make it so you can input functions as parameters! Have a little equation editor for those parameter functions instead of constants. 
- Like, you could say temp(t) = {31 @ 0 < t < 60sec, 42 @ 60sec < t < 30sec}. Little piecewise editor.
- You could have parameters depend on concentrations and stuff, and get some really interesting complexity.
- Possibly make this work on mobile?


### Multi-Reactant Reactions
- Make it so you can draw an arrow from one reactant to a REACTION! Like the little square on the reaction edge, make it so you can actually draw from another reactant to THAT square. THAT makes your reaction a multi-reactant reaction!

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
- Dropdown of edit options (delete, recolor, etc.)
    - Beside each option, display shortcut to accomplish action


### Edge Editing
- Sources can be both inputs OR outputs
- Click edge, easily swap direction
- Edges have arrows on them denoting direction
- Can change where edge ends at (look at reconnectable attr https://reactflow.dev/api-reference/types/edge)
- Copy and paste edges

- When changing edge name, click anywhere on that gray box (not just directly over text) to edit
 

### Decoration
- Background is little hexagon intersections for organic chemistry

### Optimize based on constraints!
- Set a desired threshhold for different proteins (want protein X to be > 100, reactant Y <10, etc.) then it automatically helps you choose parameters to optimzie those constraints!
- Think from the perspective of a synthetic biologist. They want to make something happen, but might not know what levers to turn. Our algorithm could tell them what levers to turn!

### Diagram Layout
- Think about how much abstraction you want your app to have for the diagrams
- Implicitly add "bound enzyme" kinetics
    - So normally you have Lactose -> sucrose + glucose (with a little "lactase" above the arrow)
    - What if we implicitly had this happen, like didn't show the full diagram? This would be a "simplified" diagram.

### Autofill Protein info
- Have a "reaction" drawer and a "protein" drawer
    - Reaction drawer for getting info about a reaction
    - Protein drawer for suggesting protein stuff

### A/B Testing
- Transitions when opening / closing drawers or no?
- Different size of hitbox

### BUG FIXES:
- Connecting edge to itself
- MAKE SURE THERE'S SAFE INPUTS!
- Be careful about window and deleting stuff
- When there's 0 connections
- ** Turn gestures off on laptop so you can swipe left and right and NOT have the screen navigate back and forth **
- Fix how parameters are handled...
- Verify rate laws are plausible
- Better error handling
- You can delete connection while drawer is open (drawer should automatically close)
- When reaction drawer is open, border of "simulate" button looks weird

### Default Rate Laws
- Make it so you can draw between two nodes. Then, you can spawn in a 3rd node, and draw an edge from that node TO THE REACTION.
- OOOOOOO!!! THIS WOULD WORK SO WELL AFTER MAKING THE SIDE BAR ON THE RIGHT THAT LETS YOU ADD DIFF TYPES OF MOLECULES!!!
- It could say "Oh, your enzyme is modulating your reaction? Let me help you out!" And it automatically populates with Enzyme kinetics or whatever.
- But if instead you drew another ligand to the reaction, it would say "Oh is this two inputs becoming 1 output? Let me help you out!" And it automatically adds a multi-species reaction or whatever.

**** TODO:
- Add different TYPES of molecules
- Add different TYPES of reactions
- Allow you to draw multi molecules to a single reaction, auto populate.

### Drawer
- Possibly put mini-reaction-diagram in its own little div and make everything smaller
- What if we just had a small arrow from species2 to species 3, and we edited the rate law beneach the mini-diagram?


### Default Rxn Type Idea
- At top of screen, have a litle box to make selections of arrows
- You can select the arrow type (regular, inhibit, big circle to represent catalyzation, etc.)
- Then, you use the arrow on the reactants! That way you can think high-level instead of thinking about rates.

### Urgent
- Return differential equations
- **better logging in Python for vercel**
- Data labels in graph
- Better rate law editing
- Weird labels on connections
- Arrows shouldn't always output on right, should be able to go from either direction
- HIGHLIGHT WHEN YOU HAVE AN EMPTY RATE LAW!!! When you click simulate, run quick check to make sure rate laws are all filled.
- DELETING NODES AND EDGES DOESN'T REMOVE THEM FROM THE INTERNAL REPRESENTATION!!!!! Very strange. 
    - CAN ADD DUPLICATE REACTIONS TO INTERNAL REPRESENTATION!! Should NOT be the case. Maybe need separate function to add and remove nodes and edges.


### TODO
- Add little hook inside reaction edges that run on adding a new source. Depending on type of reaction, handle does different things.
    - Will need to also handle removing nodes.
- 

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