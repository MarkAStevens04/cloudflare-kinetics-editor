# BioBuilder - Roadmap

This roadmap translates the [VISION](VISION.md) into a concrete path. It's **directional, not dated** - open source moves at the speed of the people who show up, so we organize by phases rather than calendar quarters. Phases may overlap, and priorities shift as we learn.

Each phase lists a **goal**, a **definition of done** (how we'll know it worked), and the **workstreams** where help is most welcome. If you want to contribute, the workstreams are good places to find or file an issue.

---

## ✅ Now - where we are today

The foundation is live at [biobuilder.app](https://biobuilder.app):

- A visual editor for building biochemical reaction networks
- Multiple kinetic rate laws (mass action, Michaelis–Menten, reversible mass action, custom)
- An ODE simulator with charting
- Fully browser-based - no install, no account, no license

Everything below builds on this.

---

## 🧬 Phase 1 - Species

**Goal:** Let users build their network *inside a real organism* instead of in a vacuum, so the work becomes translatable to the bench.

A user picks an organism context (Yeast, *E. coli*, …) that carries its own genes, proteins, and baseline behavior. They make a targeted modification (for example, replacing a native gene with GFP) and simulate the expected outcome (fluorescence, protein concentration) using real, citable parameter values rather than invented ones.

**Definition of done**
A user can:
- Log on and select an organism context
- Make a quick modification to that organism (e.g. swap a yeast gene for GFP)
- Simulate the expected fluorescence / protein concentration
- See parameters auto-populated from trusted databases rather than entered by hand

**Workstreams**
- **Organism contexts** - define a data structure (SBML or compatible) for an organism's genes, proteins, and baseline state; ship Yeast and *E. coli* first.
- **UniProt integration** - resolve genes/proteins to canonical identifiers and pull sequence/annotation data.
- **SABIO-RK integration** - automatically fetch rate constants and rate laws for reactions, with provenance shown.
- **Genetic-modification UX** - an intuitive way to add, remove, or replace genes within a context.
- **Reporter readouts** - translate simulation output into the quantities biologists care about (fluorescence, expression level).
- **SBML import/export** - round-trip models so they're portable to and from the wider ecosystem.

---

## 💾 Phase 2 - Workspace

**Goal:** Make BioBuilder a place you live in, not a tab you're afraid to close - a second brain for synthetic biology work, in the spirit of Benchling.

**Definition of done**
A user can:
- Sign in and sign out
- Create and switch between multiple projects
- Save work to the cloud and return to it later
- Share projects with others
- Undo/redo their actions (Ctrl+Z and friends)

**Workstreams**
- **Accounts & auth** - sign-up, sign-in, session management.
- **Projects & cloud persistence** - a project model and storage so work survives across sessions and devices.
- **Sharing & permissions** - share a project with a collaborator; view vs. edit access.
- **History / undo–redo** - a reliable action history within the editor. Should come for free with project model.
- **Workspace UX** - browsing, organizing, and searching across multiple projects.

> Phase 2 is also where **compute credits** are introduced (see *Sustainability* in the [VISION](VISION.md)). The free tier stays generous; credits cover heavier use, and contributing data earns them.

---

## 🔁 Phase 3 - The Learning Loop

**Goal:** Close the loop between simulation and the wet lab. Let users upload real experimental results, pool that data across labs, and infer better parameters and rate laws, turning the shared models into a living, openly accessible source of truth.

This is the most ambitious phase, and intentionally so. It's the payoff that makes the rest worthwhile: addressing parameter bias and the reproducibility crisis by letting real-world data continuously correct the literature.

**Definition of done** *(directional. This phase will be refined heavily as we go)*
- A user can upload their actual experimental results and compare them against BioBuilder's prediction.
- The platform pools contributed data across users and re-infers parameter values (and, eventually, rate laws).
- Refined parameters and improved organism models are published openly and are free for anyone to pull from.
- Data contributions are scored for quality and translated into compute credits.

**Workstreams**
- **Experimental data upload** - schema and ingestion for real results.
- **Metadata standards** - capture experimental conditions (strain, media, temperature, etc.) well enough that pooled data is comparable. *This is one of the hardest and most important pieces.*
- **Inference pipeline** - statistical/Bayesian parameter estimation over pooled datasets, with uncertainty quantification.
- **Versioned parameter store** - a transparent, versioned record of how each value evolves and what evidence backs it.
- **Open access layer** - a public API/export so anyone can pull the refined parameters and models.
- **Data quality scoring & credits** - assess how much a contribution improves model translatability, and award credits accordingly.

### Open questions we know we need to solve
Calling these out honestly. They're great places for thoughtful contributors and researchers to weigh in:
- How do we make heterogeneous experimental data comparable without overstating confidence?
- How do we handle conflicting results across labs or conditions?
- How do we score data quality fairly, and resist gaming of the credit system?
- What are the IP and consent expectations around uploaded lab data, and how do we make them transparent?

---

## How this roadmap evolves

This is a living document. The honest truth is that Phase 1 is well-defined, Phase 2 is clear, and Phase 3 will be shaped substantially by what we learn along the way (and by who joins).

To propose a change:
- **Feature ideas** → open an issue and reference the phase it belongs to.
- **Roadmap-level changes** → start a discussion; if the [VISION](VISION.md) itself needs to shift, that's a conversation worth having.

Anything that doesn't map onto a phase or principle is worth a second look. It's not necessarily a "no," but a prompt to check it against the vision first.



# Ideas & Future Work

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

- Text at top that says "SIMULATE" should say "SIMULATING" when we run. (DONE!)

- Little banner that pops up at top of page when a new app build is deployed and the user is still on the old version. Something like "We just launched an update! Refresh the page to see the changes <3"


### Parameters & Functions
- Make it so you can input functions as parameters! Have a little equation editor for those parameter functions instead of constants. 
- Like, you could say temp(t) = {31 @ 0 < t < 60sec, 42 @ 60sec < t < 30sec}. Little piecewise editor.
- You could have parameters depend on concentrations and stuff, and get some really interesting complexity.
- Possibly make this work on mobile?


### Multi-Reactant Reactions
- Make it so you can draw an arrow from one reactant to a REACTION! Like the little square on the reaction edge, make it so you can actually draw from another reactant to THAT square. THAT makes your reaction a multi-reactant reaction!
    - DONE!!!

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


### Drawer
- Possibly put mini-reaction-diagram in its own little div and make everything smaller
- What if we just had a small arrow from species2 to species 3, and we edited the rate law beneach the mini-diagram?


### Default Rxn Type Idea
- At top of screen, have a litle box to make selections of arrows
- You can select the arrow type (regular, inhibit, big circle to represent catalyzation, etc.)
- Then, you use the arrow on the reactants! That way you can think high-level instead of thinking about rates.

### Merge parameters
- When looking at params, have a list. Name: `param_name`, In reactions: `list of associated rxns`, checkbox
- You can select all the checkboxes of the params you want to merge, then click `merge params` which merges all of the parameters!
- Might need to implement a function like `scan_rxn` which looks for all associated parameters, and updates the `associated_params` attribute.
    - AFTER doing this, you can search rxns by their associated_params, then update the relevant parameters.

### Optimizations
- Update in store.ts the reactions, params, and species to be maps so you can lookup by id.

### Modifying preset reactions
- When modifying the rate law of a pre-defineed reaction (like modifying michaelis-menten), call it something else. Like "modified michaelis-menten" so that it's clear that this is NOT vanilla michaelis-menten. Add a little button on the side that allows you to reset back to default michaelis-menten.

### General
- Add link to GitHub from biobuilder page!

### Types of mechanisms
- Have like parent types of reaction mechanisms, and child types that can be edited
- So you can select "inhibition", then easily change what type of inhibition is occurring.
- Or with michaelis-menten, you can select "simplified" or "explicit" to swap between michaelis-menten version and full enzymatic version!

### Common Failure reasons
I'll use this in the tooltips to help users address common mistakes!
- Using Square Brackets
- Using Curly Brackets

### No longer living in a vacuum
Ways of making this REAL for synthetic biologists
- Top of screen, little dropdown that lets you select the species
    - If NOT "vacuum", then initialize a little environment specific for each species
    - Change adding just "molecule" and "enzyme" -> "chemical", "protein", "RNA", "DNA", "custom"
    - Background changes. Little compartments you can add stuff in.
    - https://www.nature.com/articles/s41467-022-28467-6
- When adding chemical, search chemical database, make sure it matches
- When adding protein, search uniprot. Can get info that you don't show to user like AA length, default concentration, etc.
- Add default parameters used in the specific organism, like protein synthesis rate, protein degradation rate, etc.

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
- Deleting a node on the other end of a reaction SHOULD allow the molecule to just degrade over time!
    - Deleting a node on the front end of a reaction SHOULD allow the molecule to just be generated!
    - Only when both source and target nodes are empty should we delete the reaction


- Right click node to edit properties
    - Initial value
    - Color
    - Copy (including all edges) or copy (not including all edges)
    - Called a "Context menu"
- Graph visual changes
    - Edit properties like simulation time
    - Zoom in / out on graph
    - button to allow you to select what reactants to visualize
- Different edges for each reaction input / output. Like, michaelis-menten, the catalyst arrow is its own edge.
    - Selecting the central rectangle selects all inputs / outputs.
- Picking up and dragging a handle drags that shape
    - Dragging a diamond causes a little diamond shape to move around!
- Reaction type dropdown selection in drawer
    - Different options depending on reaction type
    - *** Interpret rate laws differently depending on reaction type!! *** Like, when packaging info to send to simulation engine, handle each reaction type differently.
- Handle parameters better
    - Package them for simulation
    - Allow editing in SIMULATE dropdown menu
    - BUGFIX!! Do simple michaelis menten, then add a 2nd product. Vmax and Km get duplicated. Need to double check params don't exist before adding more.
- Michaelis-Menten, change what your enzyme is
    - Modify what your enzymeID is in the Michaelis-Menten kinetics!
    - More Robust "important chemical" handling. Make it a dictionary or something instead? So instead of "enzymeID: string" we would have "keystoneIDs: string[]"
- Add Inhibition mechanism!
- Fix deleting rates.

- Change number of reactants in a reaction! 
    - Like 2X + Y -> Z
    - Little button at bottom that lets you add reactants / products straight from drawer

- Internal representation of reactants & products
    - Fix MichaelisMenten Representation & finding enzyme
    - Package simulation 

- Global vs local parameters?
    - Similar to adding species, add parameters!
    - Fix local vs global params. Very weird stuff rn.

- Fix coefficients not working when DOING simulation!

- Make CSV downloadable

- Draw Multiple reactants and Products.

- Edit attributes of species by right clicking! (Initial values)

- Fix auto michaelis-menten

- Way better tool

- Better reactant editor
    - Little animation on open / close
    - Little Drawer opens up to edit the node! Searchable on Uniprot.

- Better parameter editor
    - Right clicking "tunable parameters" lets you "de-associate" a parameter from the reaction.
    - You can see a list of parameters, and to the right, see all associated reactions. You can scroll to the left and right to see lits of chips of all associated rxns.
    - Refactor parameters to be global / local
        - "Tunable Parameters" is just a list of parameters curretnly in rate law. Possibly make value draggable?
        - You can add existing parameters from a list, or create new parameters also from that list! 
    - Edit parameter values (global)

- Everything in Drawer is a collapsible item. That way it's less overwhelming.

- Add "catalysts" underneath "edit coefficients"

- Change edges to be parent & sub edge, that way you can more efficiently call updates.
    - Like reversible mass action, each edge to middle should be an independent edge, and each edge out of middle should be indep too.

- Become custom rate law type after editing rate law for the first time!

- When adding species / parameter to rate law, add a multiplication sign if there's not already one between two objects!

- Add little "learn" and "overview" buttons at top!
    - Similar to Navigation-Menu from radix-ui! https://www.radix-ui.com/primitives/docs/components/navigation-menu

- Bring back virtual keyboard and menu in math field in drawer! But fix them to be a little more explanatory.

- Turn many areas where we have lists of parameters / edges into scrollable elements!

- Multiple inputs / outputs on Michaelis Menten (visualize arrows, not all are working)

- Zoom in and out on graph!

- BUG: Changing to mass action should change all catalysts to inputs!
- BUG: Delete first reactant, have arrow from 3rd reactant to first, catalyze reaction, and now your product is acting as the reactant!! No good.
    - Fixed.
- BUG: Coefficient editing
    - Fixed.

- Better simulation parameter adjustments
    - Start time, end time
    - Simulation method
    - Select which parameters are visible / invisible

- BUG: Mobile & Dark Mode don't display correctly
    - Fixed.

- Smart / Snap Deleting!
    - When we delete a node, automatically re-infer the reaction type for any involved reactions.

- Mobile, have little GitHub, Discord, YouTube icons
    - Fixed.

- When user drags a new edge and nothing visually changes, somehow tell them!

### TODO
- [X] Right click to edit color / initial values
- [X] Fix Michaelis-Menten adding duplicate parameters
- [X] Add parameters with buttons.
    - [X] Create new parameters
    - [X] Associate Parameter to reaction when added to rate law

- [X] Correctly update internal representation on node / edge deletion
    - [X] Update on Edge Deletion
    - [X] Update on Node Deletion
        - [X] Update Rate Laws

- [X] Multi-reactant arrows!
    - [X] Show multiple inputs / outputs

- [X] Banner on top
    - [X] GitHub
    - [X] "BioBuilder Light"

- [X] Better tooltips everywhere!
    - [X] Clean up "Customize Rate Law" (remove hamburger and keyboard buttons)
    - [X] Clean up debug bubbles
    - [X] Say "Coming Soon" to non-implemented reaction types

- [X] Better Errors when things don't run!
    - [X] Say what's wrong with the sim
    - [X] Improve error logging on Python side

- [X] Make build passing

- [X] Make video tutorial
    - Fun example of sin(glucose * 20) * 0.005 + glucose * 0.01
    - Show keystrokes & clicks as you make them. Show deleting nodes. Show hovering over drawers for info. Show 2 output doesn't currently work. Show breaking through sometimes. Show clicking on side to open / close simulation.
    - [X] Little sign that says "Hey! Looks like you're new here. Please watch this 2min tutorial!"
    - [X] Youtube thumbnail at top so anyone can re-watch the tutorial.


- [ ] More Simulation parameters
    - [ ] Start / stop time
    - [ ] Display Resolution
    - [ ] Download CSV