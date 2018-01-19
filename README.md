# qshare
GitHub Repo for qshare QTMA project.

# Development & Contribution Set-up
- Install Node.js & node package manager NPM
  - [Install NPM & Node.js](https://www.npmjs.com/get-npm?utm_source=house&utm_medium=homepage&utm_campaign=free%20orgs&utm_term=Install%20npm)
- Make sure git is installed and configured on your computer, then clone this github repository
  - `git clone https://github.com/QueensRideshare/Qshare.git`
- Inside the **project directory** pull the latest updates from Github & install all of the package dependencies
  - `git pull origin dev`
  - `npm install`
- **Make your changes to the project**
- **Test changes** by running the server on your localhost: **localhost:8080**
  - `npm run start`
  - visit localhost:8080 in your browser

### Commiting your changes to the project github repository
- **Before you make changes**, create a feature branch off of **dev**
  - `git checkout dev`
  - `git checkout -b feature/updating-header-image`
- **add** changes to the staging area to mark as *to be commited*
  - All changes: `git add *`
  - Specific File: `git add [file]`
  - All changes in current folder: `git add .`
  - etc..
- **commit** changes with a message describing changes
  - `git commit -m "Updated the header image"`
- **push** changes to the the branch you just created.  This updates the **remote** github server with the changes you made on your **origin** (your computer)
  - `git push origin feature/updating-header-image`

### Integrating your changes into the dev branch
- Go to the Github [project repository](https://github.com/QueensRideshare/Qshare)
- Go to the **pull requests** tab
- Create a pull request from your feature branch into the **dev** branch
- Project admin (Cory) will review the code and merge the feature branch into the dev branch
- After changes have been merged: `git pull origin dev` will now reflect your updates on anyone's computer

### [Useful git commands](https://www.git-tower.com/blog/posts/git-cheat-sheet)
