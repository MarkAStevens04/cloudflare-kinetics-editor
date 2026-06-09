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
- **History / undo–redo** - a reliable action history within the editor.
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