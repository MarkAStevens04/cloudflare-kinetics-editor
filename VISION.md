# BioBuilder - Vision

> A free, browser-native platform for designing and simulating biological systems. Built toward a future where we can predict what a living cell will actually do, and where the numbers behind those predictions belong to everyone.

This document describes where BioBuilder is going and *why*. It's the north star. If you're thinking about contributing, filing an issue, or proposing a feature, this is the place to check whether your idea points in the same direction. For the concrete plan of how we get there, see [ROADMAP.md](./ROADMAP.md).

---

## Why BioBuilder exists

Building a quantitative model of a biological system is harder than it should be. The best tools available today (COPASI, Tellurium, MATLAB SimBiology) are genuinely powerful, but they ask a lot before you can do anything: install software, manage a license, learn a scripting language, or all three. For a student meeting biochemical kinetics for the first time, or an instructor with two hundred students and a single lab session, that friction is often where the journey ends.

BioBuilder starts by removing that friction. Open a browser, draw your reaction network, press simulate. No install, no license, no environment setup. That's what exists today: a kinetics editor and ODE simulator that runs entirely in the browser, free to use.

But getting people *into* modeling is only the first problem. The deeper one is that our models are frequently wrong, and we often can't tell.

## The harder problem: simulation and reality disagree

Biology is wrestling with a reproducibility crisis. Experiments that should replicate don't, and a major culprit is the parameters. The rate constants, binding affinities, and rate laws we feed into our simulations are drawn from scattered literature, measured under wildly different conditions, and shaped by the biases of whoever reported them. We plug in a number, get a clean-looking curve, and mistake precision for accuracy.

So when a synthetic biologist takes a circuit from simulation into the lab and the results don't match, it's rarely clear whether the *design* was flawed or the *parameters* were. That gap (between what we model and what cells actually do) is the central problem BioBuilder wants to close.

The long-term vision is a platform where the loop between simulation and the wet lab is connected: you design *in silico*, build *in vivo*, feed your real results back in, and the model gets better. Not just for you, but for everyone looking at that organism. Over time, the parameters stop being a static guess from a decades-old paper and become a living, continuously refined source of truth.

## Where we're headed

The path runs through three horizons. Each is useful on its own; together they're the whole vision.

### Horizon 1 - Species: models grounded in real organisms

Right now you build abstract networks. Next, you build them *inside an organism*. BioBuilder will offer organism contexts (Yeast, *E. coli*, and others) that carry their own genes, proteins, and baseline behavior, represented in a standard structure (SBML or similar) so the work is portable and interoperable.

This is what makes BioBuilder **translatable**: instead of modeling reactions in a vacuum, you model a modification to a system someone could actually build. Swap a native gene for GFP in yeast, hit simulate, and get an expected fluorescence and protein concentration. To make that real without manual data entry, BioBuilder integrates with the databases biologists already trust: **UniProt** for protein identity and **SABIO-RK** for rate constants and rate laws, so the model is populated from real, citable values rather than invented ones.

### Horizon 2 - Workspace: a second brain for synthetic biology

Modeling is iterative, and iteration needs persistence. With accounts and cloud storage, your work stops being a tab you're afraid to close. You'll have projects you can leave and return to, multiple models side by side, sharing and collaboration with labmates, and the everyday safety net of undo/redo.

The aspiration here is the role Benchling plays for experimental work: the place a synthetic biologist keeps their modeling thinking (organized, shareable, and durable) as a genuine second brain.

### Horizon 3 - The learning loop: a living source of truth

This is the most ambitious horizon, and the reason the rest exists. Once your models are grounded in real organisms (Horizon 1) and your work lives on the platform (Horizon 2), you can do something new: upload your *actual* experimental results and compare them against what BioBuilder predicted.

Aggregate those results across many labs, and the platform can do statistical inference back onto the parameters themselves, refining rate constants and even rate laws toward values that reflect how cells actually behave, rather than what any single biased measurement claimed. The crowd-sourced data corrects the literature.

The goal is for these refined parameters and improved organism models to become a new, openly accessible source of truth. Free for anyone to pull from, whether or not they ever upload a thing. If it works, it's a meaningful step toward making biological prediction genuinely reliable.

## Principles

These are the commitments that should guide every feature decision. When a proposal conflicts with one of these, that's a signal to rethink it.

- **Accessible by default.** The core experience runs in a browser with no install and no license. Just as important, it shouldn't be intimidating. A biologist who's rusty on reation mechanisms should still be able to move quickly and intuitively, getting exactly what they need. No more, no less.
- **Familiar by design.** Biologists already know how to read reaction diagrams, so we build on that intuition instead of inventing a new visual language. And the math behind a model (the ODEs) should look like the equations a biologist would recognize, not something foreign.
- **Grounded in translation.** We don't trust one number from one paper. We draw on many experimental measurements and refine them over time, converging on the values that do the best job of turning a user's diagram into an accurate prediction. (This is the heart of Horizon 3.)
- **Honest about assumptions.** Biochemical Kinetics rests on a mountain of assumptions. Our job is to surface them, and state plainly what a simulation takes for granted so users can make informed choices. We'd rather explain exactly *why* a simulation might not translate to the the bench than overpromise. 
- **Built for teaching *and* research.** A first-year student and a working synthetic biologist should both find a home here, at different depths.
- **Interoperable, not a walled garden.** Standard formats (SBML and friends) keep your work portable. We integrate with the ecosystem rather than replacing it.
- **The knowledge stays open.** Refined parameters and organism models are a public good. (See *Sustainability* below.)


## What BioBuilder is *not*

Scope matters as much as ambition. To keep the project focused:

- It is **not** a general-purpose programming environment. If a task is best served by writing arbitrary code, Tellurium and similar tools already do that well — BioBuilder favors a guided, visual experience.
- It is **not** a replacement for a lab notebook or LIMS. We model; we don't track wet-lab protocols, inventory, or sample management.
- It is **not** trying to simulate whole cells at molecular-dynamics resolution. The focus is kinetic and systems-level modeling, not all-atom physics.


## Sustainability — and why the science stays free

BioBuilder is free to use, and the things that matter most will stay free. But running cloud accounts, storage, and large-scale parameter inference costs real money, and pretending otherwise would put the project at risk. So we're honest about it up front.

The plan, beginning around the time accounts arrive:

- A **generous free tier** that covers normal learning and research use.
- **Compute credits** for the expensive operations: large simulations, heavy inference. Labs that need more than the free tier can pay for additional compute.
- **Credits earned by contributing.** Upload experimental data and you earn credits. We reward those who give high-value contributions! 
- **The commons stays open.** The refined parameters and improved organism models (the actual scientific output) remain free and publicly accessible to everyone, contributor or not.

The principle is simple: **we meter the compute, never the knowledge.** Monetization funds the infrastructure; it never paywalls the science.

## How you can shape this

This vision is a direction, not a finished spec, and it gets better with other people in it. If you want to help:

- **Found an idea that fits one of the horizons?** Open an issue and point to the horizon it serves.
- **Want to contribute code, organism models, or integrations?** Start a discussion or a PR.
- **Think the vision itself is missing something?** Say so. The best contributions sometimes change the map.

If you're reading this and it resonates, you're exactly the kind of person this project is for.