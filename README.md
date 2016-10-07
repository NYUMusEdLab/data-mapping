# Data Mapping

[![Build Status](https://buildbot.musedlab.org/api/badges/NYUMusEdLab/dta-mapping/status.svg)](https://buildbot.musedlab.org/NYUMusEdLab/data-mapping)

## Usage


## Build and Run Locally

### Pre-requisites

Install Node: https://nodejs.org

Install Gulp:
```sh
sudo npm install -g gulp
```

### Initial build, and when updating or editing
NOTE: The build process creates and makes use of two directories which are not part of the repo: node_modules and dist.
While these are already included in .gitignore, if you are using an IDE or editor (e.g. WebStorm) which scans the entire project in order
to provide project-wide search, auto-complete or refactoring, you may want to exclude these directories to improve performance. To
avoid the you create these directories initially

```sh
sudo npm install
npm run dev
```
### To build production version (this compresses all js files in dist)
```sh
npm run prod
```

### To build test version (same as prod, but different default source)
```sh
npm run test
```

### To clean current dist folder
```sh
npm run clean
```

### Updating the .drone.sec file

If you've created a new `secrets.yml` file and need to update the .drone.sec file, the procedure below will help you:

Get the drone CLI from here: http://readme.drone.io/devs/cli/

drone -s https://buildbot.musedlab.org -t <TOKEN: get your user token from your drone profile page> secure --in <SECRET_FILE: secrets.yml> --out <OUTPUT_FILE: .drone.sec> --repo NYUMusEdLab/variation-generator
