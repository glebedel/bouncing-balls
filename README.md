## Grumbler

<https://medium.com/@bluepnume/introducing-grumbler-an-opinionated-javascript-module-template-612245e06d00>

A template for writing distributable javascript libraries.

Javascript libraries are fun to write. Setting up all of the boilerplate to get your build up and running is not so fun.

This module provides a forkable module template, which you can use to kick-start a new javascript library. Once you've done that, feel free to come back and switch out the tooling for whatever you prefer.

## Features

-   Build minified and unminified versions of your code, with source maps
-   Use ES2015 out of the box
-   Write headless Karma / Mocha tests, which run in Chrome Headless and other browsers, with code coverage reports
-   Integrate with Travis CI out of the box
-   Write error free, type-safe code with ESLint, Flow-Type, and Flow-Runtime

## Technologies

-   babel
-   eslint
-   flowtype
-   flow-runtime
-   karma
-   phantomjs
-   chrome headless
-   mocha
-   istanbul
-   webpack
-   npm
-   travis

## Quick Start

#### Getting Started

-   Fork the module
-   Run setup: `npm run setup`
-   Start editing code in `./src` and writing tests in `./tests`
-   `npm run build`

#### Building

```bash
npm run build
```

#### Tests

-   Edit tests in `./test/tests`
-   Run the tests:

    ```bash
    npm run test
    ```

#### Testing with different/multiple browsers

```bash
npm run karma -- --browser=PhantomJS
npm run karma -- --browser=Chrome
npm run karma -- --browser=Safari
npm run karma -- --browser=Firefox
npm run karma -- --browser=PhantomJS,Chrome,Safari,Firefox
```

#### Keeping the browser open after tests

```bash
npm run karma -- --browser=Chrome --keep-open
```

#### Publishing

##### Before you publish for the first time:

-   Delete the example code in `./src`, `./test/tests` and `./demo`
-   Edit the module name in `package.json`
-   Edit `README.md` and `CONTRIBUTING.md`

##### Then:

-   Publish your code: `npm run release` to add a patch
    -   Or `npm run release:path`, `npm run release:minor`, `npm run release:major`

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [BouncingBalls](#bouncingballs)
    -   [drawBall](#drawball)
    -   [isDrawing](#isdrawing)
    -   [stop](#stop)
    -   [start](#start)
    -   [moveBall](#moveball)
    -   [addBall](#addball)
    -   [draw](#draw)
    -   [ballMouseHandler](#ballmousehandler)
-   [Ball](#ball)
    -   [getNextPos](#getnextpos)
    -   [setPos](#setpos)
    -   [aggregateForces](#aggregateforces)
    -   [decayForces](#decayforces)
    -   [moveNext](#movenext)

## BouncingBalls

**Parameters**

-   `$0` **any** 
    -   `$0.canvas`   (optional, default `document.createElement("canvas")`)
    -   `$0.container`   (optional, default `window.document.body`)
-   `settings` **{gravity: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), speed: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), click: [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean), collisionRatio: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), drawInterval: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)}**  (optional, default `{gravity:1,speed:5,bounceDecayRatio:0.965,gravityDecayRatio:1.02,click:true,collisionRatio:0.98,drawInterval:20}`)

### drawBall

Draw ball on BouncingBalls' canvas

**Parameters**

-   `ball` **[Ball](#ball)** ball to draw

### isDrawing

Whether or not drawing loop is running

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true if drawing loop is running / false otherwise

### stop

Stop the drawing loop

### start

start the drawing loop

Returns **TimeoutID** timeout id of the drawing loop

### moveBall

move a ball on the canvas to its next coordinates

**Parameters**

-   `ball` **[Ball](#ball)** to move on canvas

Returns **Coordinates** new coordinates where the ball has been moved to

### addBall

add a ball on the canvas

**Parameters**

-   `args` **...any** 
-   `null` **any** {@see Ball}

Returns **[Ball](#ball)** ball created

### draw

draw all the BouncingBalls' balls on its canvas
If parameter is true then it launches the drawing loop

**Parameters**

-   `triggered` **[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** whether or not function is being manually triggered or triggered via timeout loop (optional, default `false`)

### ballMouseHandler

Ball creation mouse handler (creating the ball based on x/y position of mouse event)

Returns **[Ball](#ball)** ball created/added to canvas

## Ball

### getNextPos

Get the next coordinates of the ball based on current position and forces

Returns **Coordinates** x/y coordinates

### setPos

reset the ball position

**Parameters**

-   `position` **Coordinates** new coordinates where the ball must be set to

### aggregateForces

Sum up all x/y translations based on x/y components of each force

Returns **Coordinates** x/y object reflecting summed up translations

### decayForces

apply the decay ratio of each force to their x/y components

### moveNext

Move the ball to the next coordinates.
Also apply the decay ratio to each force (see [Ball~decayForces](Ball~decayForces)) after setting new coordinates

**Parameters**

-   `nextPos` **Coordinates** coordinates to move the ball to. Uses [Ball~setPos](Ball~setPos) (optional, default `this.getNextPos()`)

Returns **Coordinates** the new coordinates where the ball has been moved to
