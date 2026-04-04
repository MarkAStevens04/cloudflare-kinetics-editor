# Contributing to BioBuilder
Thank you SO MUCH for taking the time to contribute to this project!! 🎉🎉

The following is a set of guidelines for contributing to BioBuilder. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request! 😊


## Resources
Here's a few resources in case you get stuck while contributing. We're here to help! 

- **Discord**: Join our [DISCORD](https://discord.gg/GmsKryYDGN) server to discuss contributions, ask questions, and make some friends with like-minded people!
- **Email**: Send me an email at <mark@biobuilder.app> if you ever need anything, or have some ideas for improvement or feedback!! I'm immensely grateful you're thinking about contributing, and my goal is to respond to emails within 1 week. 

## Table of contents
- [Code of Conduct](#code-of-conduct)
- [Where do I start?](#where-do-i-start)
    - [First Time Contributors](#first-time-contributors)
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


## Code of Conduct
See [CODE_OF_CONDUCT.md](https://github.com/MarkAStevens04/cloudflare-kinetics-editor/blob/main/CODE_OF_CONDUCT.md)!


## Where do I start?

### First Time Contributors

BioBuilder is built for biologists without a computer science background. If you fall in this category, this is the perfect place to start building your skills! Contributions can be as small as tweaking the documentation, or as big as implementing a completely new feature to the platform. We're always grateful for any help we can get.

- [THIS](https://www.youtube.com/watch?v=dLRA1lffWBw) youtube video gives a visual explanation of how to make your first contribution.
- Join our [DISCORD](https://discord.gg/GmsKryYDGN) to joing a community of passionate scientists! 


### BioBuilder's Repos
There are TWO repositories for biobuilder: The "frontend" (this repo!) which is what the user actually sees and interacts with, and the "backend", which is what computes our simulation. 

- [BioBuilder Frontend](https://github.com/MarkAStevens04/cloudflare-kinetics-editor)
- [BioBuilder Backend](https://github.com/MarkAStevens04/Kinetics-Editor)



### File Structure

Here's where you can find the code for each component:

- `src/react-app/App.tsx`: Core code for web app
- `src/react-app/ProteinNode.tsx`: Code for nodes in the graph editor
- `src/react-app/RxnEdge.tsx`: Code for edges connecting nodes in graph editor
- `src/react-app/Drawer.tsx`: Code for drawer which opens when you click an edge

# Getting started

This section gives a gentle introduction into making a "fork" of this repository, running the code locally, and making your first edit. 

Don't know what to code? Take a look at at the issues marked "[good first issue](https://github.com/MarkAStevens04/cloudflare-kinetics-editor/issues?q=state%3Aopen%20label%3A%22good%20first%20issue%22)" and "[help wanted](https://github.com/MarkAStevens04/cloudflare-kinetics-editor/issues?q=state%3Aopen%20label%3A%22help%20wanted%22)" to see what others need help with!

For new developers, I recommend downloading [GitHub Desktop](https://github.com/apps/desktop) and [Visual Studio Code](https://code.visualstudio.com/). Finally, [THIS](https://www.youtube.com/watch?v=dLRA1lffWBw) youtube video is immensely helpful in making your first edit.

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

1. Edit the code to create your desired feature. Note with VS Code, you have to click Ctrl + S (or CMD + S on Mac) to save your code.

Make sure to follow our Style Guides (TODO).

## Step 4: Run your code locally

To run your code, open a terminal in Visual Studio Code (Top of the screen, click "Terminal") and run:

```
npx vite
```

After waiting a few seconds, the website should now be hosted at the website <localhost:5174>

One nice feature of Visual Studio Code is that after you save your edits (with CTRL + C on Windows, or CMD + C on Mac), your website should automatically update to reflect the changes!

## Step 5: Merge your changes

Congrats on making your first edits to BioBuilder!! Now, let's put these edits on the main BioBuilder website.

Go to the GitHub Desktop app. You should now see a list of the files you've edited. Type a concise but descriptive summary for what changes you've made (ex: "Fixed grammar mistake in README.md" or "Created Interactive Buttons in Rate Editor").

Fill your description with a description of what you changed. Making a good description is a skill you will learn over time, so don't be dissapoitned if your change is rejected at first! Some good rules of thumb are:

- It should be clear WHY each file was changed
- The purpose of the change should be explicit
- TODO

Now, click "Commit to master" and in the top right, "Push to origin". 

Go back to YOUR fork of the repo on the GitHub website (where you clicked "Open with GitHub Desktop").

Click "Contribute" (on the right side of the page) and "open pull request".

Now, click "Create pull request".

CONGRATS!!! You've just made your first contribution to BioBuilder!! But we're not done yet. Before we put your changes into the website, there's always someone who reviews the code and gives feedback. 

Right now, your code exists as a "Pull Request" (PR). You can see this PR in the "Pull Requests" tab of the BioBuilder repo. You'll get notifications once someone responds to this pull request.

## Step 6: Respond to feedback

We want your help improving BioBuilder, and our goal is to make your code changes materialize! But we also want to make sure our project is sustainable & bug-free. Don't be offended if your pull request is denied at first, this is normal. Take it as an opportunity to learn how to improve your coding skills!

We will make comments on your code and give feedback. This is called a "code review". These comments and feedback will appear underneath your pull request.

Once your code is approved, it will be merged onto the main branch, and your code will be public!

Huge congrats on making your first contribution, and thanks for improving BioBuilder!! This platform wouldn't be possible without amazing contributors like you ❤️


# Request / Report Something!

This section details how you can report any bugs you find, or request new features.

## How do I submit a Bug report?

The best person to fix a bug is YOU! You're more qualified than you think, and if you see something that you can improve, you should do it! But if you just want to report a bug, you can do that following this guide.

Bugs are tracked as [GitHub issues](https://guides.github.com/features/issues/). Create an issue and fill in the required information. It helps us resolve the issue quicker!

Go to the PUBLIC repository (not your fork if you've created a fork), go to the "Issues" tab, and click "New Issue".

- impact severity (1 - Small annoyance, 2 - Frustrating but recoverable,  3 - Project Completely crashes)

## How do I request a feature?

The best person to implement a feature is YOU! You're more qualified than you think, and if you see something that you can improve, you should do it! But if you just want to request a feature, you can do that following this guide.

Feature Requests are tracked as [GitHub issues](https://guides.github.com/features/issues/). Create an issue and fill in the required information. It helps us triage the feature quicker!

Go to the PUBLIC repository (not your fork if you've created a fork), go to the "Issues" tab, and click "New Issue".