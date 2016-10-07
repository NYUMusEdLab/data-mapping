# Variation Generator

[![Build Status](https://buildbot.musedlab.org/api/badges/NYUMusEdLab/variation-generator/status.svg)](https://buildbot.musedlab.org/NYUMusEdLab/variation-generator)

## Usage


## Build and Run Locally

### Pre-requisites

Install Node: https://nodejs.org

Install Gulp:
```sh
sudo npm install -g gulp
```

###Install Google-Maps
```sh
npm install google-maps
```

### Initial build, and when updating or editing
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
