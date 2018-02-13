# qshare
GitHub Repo for qshare QTMA project.

# Development & Contribution Set-up
- Install Node.js, MongoDB, & node package manager NPM
  - [Install NPM & Node.js](https://www.npmjs.com/get-npm?utm_source=house&utm_medium=homepage&utm_campaign=free%20orgs&utm_term=Install%20npm)
  - [Install MongoDB](https://www.mongodb.com/download-center?jmp=nav#community)
- Make sure git is installed and configured on your computer, then clone this github repository
  - `git clone https://github.com/QueensRideshare/Qshare.git`
- Inside the **project directory** pull the latest updates from Github & install all of the package dependencies
  - `git checkout dev`
  - `git pull origin dev`
  - `npm install`
- **Make your changes to the project**
- **Use scripts below to test & build application** 
```
# install dependancies
npm install

# run the server in development mode with nodemon
npm run server-dev

# runs webpack-dev-server for ui development
npm run client-dev

# run the server in production mode, bundle client and serve bundle
npm run start
```

# Setting Up .env Environment Variables 
**Before you can run, test, or build the application, you must create a .env file!**

|Variable|Value|
|--------|-----|
|DB_HOST|localhost|
|DB_USER|[DB USERNAME HERE]|
|DB_PASS|[DB PASSWORD HERE]|
|DB_NAME|qshare|
|PORT|8080|
|LOCAL_ROOT_URL|http://localhost:8080/api|

**See example.env for syntax reference**

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
