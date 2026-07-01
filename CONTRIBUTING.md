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
- [Where do I start?](#where-do-i-start)
    - [First Time GitHub Users](#first-time-github-users)
    - [BioBuilder's Repos](#biobuilders-repos)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
    - [Step 1: Fork the project](#step-1-fork-the-project)
    - [Step 2: Copy the repository onto your computer](#step-2-copy-the-repository-onto-your-computer)
    - [Step 3: Make your edits!](#step-3-make-your-edits)
    - [Step 4: Run your code locally](#step-4-run-your-code-locally)
    - [Step 5: Merge your changes](#step-5-merge-your-changes)
    - [Step 6: Respond to feedback](#step-6-respond-to-feedback)
- [Request / Report Something!](#request-report-something)
    - [How do I submit a Bug report?](#how-do-i-submit-a-bug-report)
    - [How do I submit a Request a feature?](#how-do-i-request-a-feature)
- [Specific Feature Guides](#specific-feature-guides)
    - [Creating a new reaction type](#creating-a-new-reaction-type)


## Code of Conduct
See [CODE_OF_CONDUCT.md](https://github.com/MarkAStevens04/cloudflare-kinetics-editor/blob/main/CODE_OF_CONDUCT.md)!


## Where do I start?

This section is for orienting you around how this project is structured.

### First Time GitHub Users

This section will link to some great resources for helping you make your first ever contribution to GitHub!

- [THIS](https://www.youtube.com/watch?v=dLRA1lffWBw) youtube video gives a visual explanation of how to make your first contribution to GitHub.
- Join our [DISCORD](https://discord.gg/GmsKryYDGN) to joing a community of passionate scientists, who are more than happy to help you make your first contribution.


### BioBuilder's Repos
There are TWO repositories for biobuilder: The "frontend" (this repo!) which is what the user actually sees and interacts with, and the "backend", which is what computes our simulation. 

- [BioBuilder Frontend](https://github.com/MarkAStevens04/cloudflare-kinetics-editor)
- [BioBuilder Backend](https://github.com/MarkAStevens04/Kinetics-Editor)



### File Structure

Here's the general file structure for some of the most important components: 

- `src/react-app/App.tsx`: Where all the components come together + code for many of the overlays (banner, error boxes, etc).
- `src/react-app/stores/store.ts`: Core logic, data structures, and states. Where things actually "happen".
- `src/react-app/components/ProteinNode.tsx`: Code for each node on the canvas
- `src/react-app/components/RxnEdge.tsx`: Wrapper for all edge types. Individual edge types are editable in `src/react-app/components/edges` and tracked in `src/react-app/components/edges/index.ts`
- `src/react-app/components/Drawer.tsx`: Code for rate law editor. Drawer opens when you click an edge.
- `src/react-app/components/SimulationDrawer.tsx`: Code for our "SIMULATE" button. Note that the actual simulation is packed in `store.ts` by the `fetchSimulationData` function, and sent to the [BioBuilder Backend](https://github.com/MarkAStevens04/Kinetics-Editor).

If you're ever confused where something lives, feel free to leave a comment on the relevant issue, or ask via any of the [resources](#resources).

# Getting started

This section gives a gentle introduction into making a "fork" of this repository, running the code locally, and making your first edit. 

> Don't know what to code? Take a look at at the issues marked "[good first issue](https://github.com/MarkAStevens04/cloudflare-kinetics-editor/issues?q=state%3Aopen%20label%3A%22good%20first%20issue%22)" or "[🚨 High Priority](https://github.com/MarkAStevens04/cloudflare-kinetics-editor/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22%F0%9F%9A%A8%20High%20Priority%22)" to see what our project needs most! 

For new developers, I recommend downloading [GitHub Desktop](https://github.com/apps/desktop) and [Visual Studio Code](https://code.visualstudio.com/). Finally, [THIS](https://www.youtube.com/watch?v=dLRA1lffWBw) youtube video is immensely helpful in making your first contribution.

**🚨NOTE:🚨** If you struggle somewhere setting up, so will future contributors. Please edit this document with anything that helped you get set up to start contributing!! 

## Step 1: Fork the project

1. Go to the [root of this repository](https://github.com/MarkAStevens04/cloudflare-kinetics-editor). In the top right, click "fork repository". 
2. Name your fork something descriptive
3. Click "create fork"


## Step 2: Copy the repository onto your computer

1. In the top right of your new repository, click the green "Code" button.
2. Click "Open with GitHub Desktop" (or follow other instructions).
3. The [GitHub Desktop](https://github.com/apps/desktop) app should open, and you can just click the blue "clone" button.
4. If a box appears that says "How are you planning to use this fork", click **"To contribute to the parent project"**.
5. On the right side of the GitHub Desktop app, there should be a box that says "Open Visual Studio Code". Click this. 

You can now edit the project!

## Step 3: Make your edits!

1. Edit the code to create your desired feature. Note with VS Code, you have to click `Ctrl + S` (or `CMD + S` on Mac) to save your code.

Make sure to follow our Style Guides (TODO, not yet created).

## Step 4: Run your code locally

To run your code, open a terminal in Visual Studio Code (Top of the screen, click "Terminal") and run:

```
npm run dev
```

After waiting a few seconds, the website should now be hosted at the website <localhost:5173> or some other URL. It will be specified in the terminal.

One nice feature of Visual Studio Code is that after you save your edits (with CTRL + C on Windows, or CMD + C on Mac), your website will automatically update to reflect the changes!

## Step 5: Merge your changes

Congrats on making your first edits to BioBuilder!! 🥳 Now, let's put these edits on the main BioBuilder website.

Go to the GitHub Desktop app. You should now see a list of the files you've edited. Type a concise but descriptive summary for what changes you've made (ex: "Fixed grammar mistake in README.md" or "Created Interactive Buttons in Rate Editor"). Fill your description with a description of what you changed. 

Now, click "Commit to master" and in the top right, "Push to origin". 

Go back to YOUR fork of the repo on the GitHub website (where you clicked "Open with GitHub Desktop").

Click "Contribute" (on the right side of the page) and "open pull request".

Now, click "Create pull request".

CONGRATS!!! 👏 You've just made your first contribution to BioBuilder!! But we're not done yet. Before we put your changes on the website, someone will review your code and give feedback. Don't be disappointed if your change is rejected at first! You learn to be a better contributor by contributing more. Keep trying and you'll become a pro in no time! 

Right now, your code exists as a "Pull Request" (PR). You can see this PR in the "Pull Requests" tab of the BioBuilder repo. You'll get notifications once someone responds to this pull request.

## Step 6: Respond to feedback

We want your help improving BioBuilder, and our goal is to make your code changes materialize! But big projects are bug magnets, and it's best to have a second pair of eyes looking over the code we add. Most pull requests aren't accepted at first, and require a round or two of revisions. Our goal is to get your code on the website, so we'll do our best to give feedback quickly and clearly, but please ask questions if something is unclear.

We will make comments on your code and give feedback. This is called a "code review". These comments and feedback will appear underneath your pull request.

Once your code is approved, it will be merged onto the main branch, and your code will be public!

Huge congrats on making your first contribution, and thanks for improving BioBuilder!! This platform wouldn't be possible without amazing contributors like you ❤️


# Request / Report Something!

This section explains how to report bugs and request new features. 

## How do I submit a Bug report?

The best person to fix a bug is YOU! You're more qualified than you think, and if you see something that you can improve, you should do it! But if you just want to report a bug, you can do that following this guide.

Bugs are tracked as [GitHub issues](https://guides.github.com/features/issues/). Create an issue and fill in the required information. The more detail you provide, the quicker we can resolve it! You can also do a quick search to see if someone else has already documented this issue. 

Go to the PUBLIC repository (not your fork if you've created a fork), go to the "Issues" tab, and click "New Issue". There will be a template for "Bug Reports" for you to fill in.

## How do I request a feature?

The best person to implement a feature is YOU! You're more qualified than you think, and if you see something that you can improve, you should do it! But if you just want to request a feature, you can do that following this guide.

Feature Requests are tracked as [GitHub issues](https://guides.github.com/features/issues/). Create an issue and fill in the required information. The more detail you provide, the quicker we can implement it! You can also do a quick search to see if someone else has already suggested the feature. 

Go to the PUBLIC repository (not your fork if you've created a fork), go to the "Issues" tab, and click "New Issue". There will be a template for "Feature Requests" for you to fill in.


# Specific Feature Guides
## Creating a new reaction type

This section describes how to implement a new reaction type. We currently have Michaelis Menten reactions and Mass Action reactions, and are looking to expand into more. This is an advanced feature, and we recommend making a couple of smaller changes before going for this one. Take a look at at the issues marked "[good first issue](https://github.com/MarkAStevens04/cloudflare-kinetics-editor/issues?q=state%3Aopen%20label%3A%22good%20first%20issue%22)" if you want ideas on what changes to make! 

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

