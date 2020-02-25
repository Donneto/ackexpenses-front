# ACKLEXPENSES - Front End

Acklen Avenue Front End  Coding Test

## Installation

Make sure you have node installed in your computer and then go into Project's Folder and run the following commands :

```javascript
npm install
```

## Running

Wait for dependencies to install. FrontEnd uses firebase as its hosting so Firebase CLI is required.

```javascript
npm install -g firebase-tools
```

In order to run a local server and serve the project run the following:

```javascript
firebase serve --only hosting
```
This will init a local Server and load the /public directory.

## Working with Assets

Webpack is the main bundler. It runs a couple of things when working with assets ( minifiers, Linters, Transpilers, ...) and it has to stages: 

#### Compile for Local Development:
Run it when working locally. It will watch any assets ( javascript/SASS ) file and compile it accordingly.
```javascript
npm run build
```



#### Compile for Production:

Run it before deploy to production/commiting changes. It will minify assets and run other optimizations on the files.

```javascript
npm run build:prod
```

