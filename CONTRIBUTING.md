# Resources
Making your first contribution is scary, but we're here to help! Problems and questions will arise as you contribute, and we've included a few resources if you want someone to talk to:

- **Discord**: Join our [DISCORD](https://discord.gg/GmsKryYDGN) server to discuss contributions, ask questions, and make some friends with like-minded people!
- **Email**: Send me an email at <mark@biobuilder.app> if you ever need anything. I'm immensely grateful you're thinking about contributing, and my goal is to respond to emails within 1 week. 


# Contributing to BioBuilder
## Table of contents
- TODO

## Code of Conduct
- TODO


## Where do I start?

### First Time Contributors

BioBuilder is intentionally built for biologists without a computer science background. If you're new to computer science, this is the perfect place to start honing your skills! Contributions can be as small as tweaking this documentation, or as big as implementing a completely new feature to the platform. We always welcome any help we can get.

We reccommend taking a look at [THIS](https://www.youtube.com/watch?v=dLRA1lffWBw) youtube video for a high-level overview on what it means to contribute to open-source, and the general process to contributing.

Feel free to join our [DISCORD](https://discord.gg/GmsKryYDGN) to ask any questions!

### BioBuilder's Repos
There are TWO packages for biobuilder. The first is the "frontend" (this repo!) which is what the user actually sees and interacts with. The second is the "backend", which is our simulation engine. 

- [BioBuilder Frontend](https://github.com/MarkAStevens04/cloudflare-kinetics-editor)
- [BioBuilder Backend](https://github.com/MarkAStevens04/Kinetics-Editor)



## File Structure

- `src/react-app/App.tsx`: Core code for web app
- `src/react-app/ProteinNode.tsx`: Code for nodes in the graph editor
- `src/react-app/RxnEdge.tsx`: Code for edges connecting nodes in graph editor
- `src/react-app/Drawer.tsx`: Code for drawer which opens when you click an edge

# Getting started

This section walks you through setting up the repository for you to edit.

For new developers, I recommend downloading [GitHub Desktop](https://github.com/apps/desktop) to manage Git. I also recommend making edits with [Visual Studio Code](https://code.visualstudio.com/). 

### Step 1: Fork the project

Go to the [root of this repository](https://github.com/MarkAStevens04/cloudflare-kinetics-editor). In the top right, click "fork repository". 

Name your fork something descriptive

Click "create fork"

### Step 2: Copy the repository onto your computer

In the top right of your new repository, click the green "Code" button.

Click "Open with GitHub Desktop" (or follow other instructions).

The [GitHub Desktop](https://github.com/apps/desktop) app should open, and you can just click the blue "clone" button.

If a box appears that says "How are you planning to use this fork", click **"To contribute to the parent project"**.

On the right side of the GitHub Desktop app, there should be a box that says "Open Visual Studio Code". Click this. 

You can now edit the project!

### Step 3: Make your edits!

Edit the code to create your desired feature. Note with VS Code, you have to click Ctrl + S (or CMD + S on Mac) to save your code.

Make sure to follow our Style Guides (TODO).

### Step 4: Run your code locally

To run your code, open a terminal in Visual Studio Code (Top of the screen, click "Terminal") and run:

```
npx vite
```

After waiting a few seconds, the website should now be hosted at the website <localhost:5174>

One nice feature of Visual Studio Code is that after you save your edits (with CTRL + C on Windows, or CMD + C on Mac), your website should automatically update to reflect the changes!

### Step 5: Merge your changes

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

CONGRATS!!! You've just made your first contribution to BioBuilder!!

### Step 6: Respond to feedback

We want your help improving BioBuilder, and our goal is to make your code changes materialize! Don't be offended if your pull request is denied at first, this is normal.



