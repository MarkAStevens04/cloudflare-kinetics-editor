[![N|Solid](src/react-app/assets/Bio_Builder_Banner.png)](https://biobuilder.app/)

<div align="center">

[![N|Solid](https://img.shields.io/website?url=https%3A%2F%2Fbiobuilder.app%2F&label=frontend)](https://biobuilder.app/)
[![N|Solid](https://img.shields.io/website?url=https%3A%2F%2Fkinetics-editor.vercel.app%2Fapi%2Fhealth&label=backend&cacheSeconds=600)](https://kinetics-editor.vercel.app/api/health)
![N|Solid](https://img.shields.io/github/check-runs/MarkAStevens04/cloudflare-kinetics-editor/main?label=build)
[![N|Solid](https://img.shields.io/badge/github-backend-blue?logo=github)](https://github.com/MarkAStevens04/Kinetics-Editor)
![GitHub last commit](https://img.shields.io/github/last-commit/MarkAStevens04/cloudflare-kinetics-editor)



[![N|Solid](https://badgen.net/badge/icon/discord?icon=discord&label)](https://discord.gg/GmsKryYDGN) 
[![N|Solid](https://img.shields.io/badge/-mark@biobuilder.app-blue?logo=gmail&label=Email)](mailto:mark@biobuilder.app)

[![N|Solid](https://img.shields.io/badge/Give%20us%20feedback!!-magenta
)](https://tally.so/r/VLYDpa)

</div>


# Basic Overview

BioBuilder is a web-based biochemical kinetics editor and simulator! 🧪✨ Built specifically to run simulations quickly and easily. 

# Philosophy

Biochemical kinetics allows you to predict the future in biology. 🔮 It allows you to know exactly which chemicals and how much will be produced, given some set of initial conditions.

We believe that biochemists shouldn't need to be computer scientists to benefit from this technique. BioBuilder bridges the gap between biologists and computers, and allows you to start running simulations NOW! To understand what our project is trying to achieve, see [VISION.md](VISION.md).

**There are two repos**: The frontend (this repo) to interface with scientists, and the backend ([HERE](https://github.com/MarkAStevens04/Kinetics-Editor)) to run our simulations.

Go to [BioBuilder.app](https://biobuilder.app?utm_source=github&utm_medium=readme&utm_campaign=docs) to start using the software now!


# Contributing

Want to see a new feature on the site? Is there a small tweak that would make the site less frustrating? The best person to make the change is *YOU*! You don't need to be an expert computer scientist to make a meaningful impact. Whether you're a seasoned open-source veteran, or this is your first contribution, we always welcome any help we can get, and we've created a guide to help make it easy for you to get started.

See [CONTRIBUTING.md](CONTRIBUTING.md) for a guide on how to get started making your first contributions. For a general view of what we're trying to achieve, see [VISION.md](VISION.md). For actionable steps on what needs to be done, view [ROADMAP.md](ROADMAP.md) or at our pull requests!

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
Now you've set up your simulation, it's time to run it! Click "SIMULATE" in the top right corner, and voila! You just ran the simulation! 


# Feedback

We LOVE feedback, and we're always looking for ways to improve the platform! Feel free to shoot me an email at <mark@biobuilder.app> with any suggestions or feedback, and I'd be happy to respond.

You can also fill out [THIS](https://tally.so/r/VLYDpa) feedback form!


# Build
For exhaustive instructions on how to run the code, see [CONTRIBUTING.md](CONTRIBUTING.md). Here's a quick refresher:

Locally, run `npm run dev`

To deploy, run 
```
npm run build
npm run deploy
```