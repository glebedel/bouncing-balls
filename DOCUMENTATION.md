# bouncing-balls *1.0.2*

> Bouncing balls canvas generator.


### src/BouncingBalls.js


#### new BouncingBalls() 








##### Returns


- `Void`



#### BouncingBalls.constructor(settings) 

Creates an instance of BouncingBalls.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| $0.canvas&#x3D;document.createElement(&quot;canvas&quot;) | `HTMLCanvasElement`  | canvas for bouncing balls | *Optional* |
| $0.container&#x3D;window.document.body | `HTMLElement`  | container where canvas is. Used to set canvas' default width/height if canvas doesn't have width/height | *Optional* |
| settings | `Object`  | Bouncing balls parameters | &nbsp; |
| settings.gravity&#x3D;1 | `number`  | gravity parameter for all balls created {@see #Balls} | *Optional* |
| settings.speed&#x3D;5 | `number`  | speed parameter for all balls created {@see #Balls} | *Optional* |
| settings.gravityDecayRatio&#x3D;1.02 | `number`  | gravity decay parameter for all balls created {@see #Balls} | *Optional* |
| settings.bounceDecayRatio&#x3D;0.965 | `number`  | bouncing decay applied to bounce force when object bounces off walls/floor | *Optional* |
| settings.drawInterval&#x3D;20 | `number`  | in ms time between each redraws of the canvas (refresh of balls positions) | *Optional* |
| settings.click&#x3D;true | `boolean`  | whether or not clicks in canvas should create balls | *Optional* |




##### Returns


- `Void`



#### BouncingBalls.drawBall(ball) 

Draw ball on BouncingBalls' canvas




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| ball | `Ball`  | ball to draw | &nbsp; |




##### Returns


- `Void`



#### BouncingBalls.isDrawing() 

Whether or not drawing loop is running






##### Returns


- `boolean`  true if drawing loop is running / false otherwise



#### BouncingBalls.stop() 

Stop the drawing loop






##### Returns


- `Void`



#### BouncingBalls.start() 

start the drawing loop






##### Returns


- `TimeoutID`  timeout id of the drawing loop



#### BouncingBalls.moveBall(ball) 

move a ball on the canvas to its next coordinates




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| ball | `Ball`  | to move on canvas | &nbsp; |




##### Returns


- `Coordinates`  new coordinates where the ball has been moved to



#### BouncingBalls.addBall({@see Ball}) 

add a ball on the canvas




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| {@see Ball} | `any`  |  | &nbsp; |




##### Returns


- `Ball`  ball created



#### BouncingBalls.draw([triggered&#x3D;false]) 

draw all the BouncingBalls' balls on its canvas
If parameter is true then it launches the drawing loop




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| triggered&#x3D;false | `Boolean`  | whether or not function is being manually triggered or triggered via timeout loop | *Optional* |




##### Returns


- `Void`



#### new Ball() 








##### Returns


- `Void`



#### Ball.constructor(position, settings[, velocity&#x3D;{}]) 

Creates an instance of Ball.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| position | `Coordinates`  |  | &nbsp; |
| settings | `Object`  | settings of the ball | &nbsp; |
| settings.radius | `Number`  | radius of the ball | *Optional* |
| settings.color&#x3D;randomColor() | `String`  | color (random color by default {@see ./src/Colors.js}) | *Optional* |
| settings.gravity&#x3D;1 | `Number`  | force y translator | *Optional* |
| settings.speed&#x3D;5 | `Number`  | (multiplicator effect on x/y translations for each ball move) | *Optional* |
| settings.gravityDecayRatio&#x3D;1.02 | `Number`  | multiplicator on each forces x/y translation after each ball move | *Optional* |
| velocity&#x3D;{} | `Force`  | force to be applied on creation of the ball | *Optional* |
| velocity.x&#x3D;(Math.random() | `number`  | 0.5) * 2] velocity's x translation component. Defaults between 1 & -1 | *Optional* |
| velocity.y&#x3D;(Math.random() | `number`  | 0.5) * 2] velocity's x translation component. Defaults between 1 & -1 | *Optional* |
| velocity.decayRatio&#x3D;1 | `number`  | velocity's force decay ratio. (1 by default so doesn't weaken) | *Optional* |




##### Returns


- `Void`



#### Ball.getNextPos() 

Get the next coordinates of the ball based on current position and forces






##### Returns


- `Coordinates`  x/y coordinates



#### Ball.setPos(position) 

reset the ball position




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| position | `Coordinates`  | new coordinates where the ball must be set to | &nbsp; |




##### Returns


- `Void`



#### Ball.aggregateForces() 

Sum up all x/y translations based on x/y components of each force






##### Returns


- `Coordinates`  x/y object reflecting summed up translations



#### Ball.decayForces() 

apply the decay ratio of each force to their x/y components






##### Returns


- `Void`



#### Ball.moveNext() 

Move the ball to the next coordinates.
Also apply the decay ratio to each force (see {@link Ball~decayForces}) after setting new coordinates




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| nextPos&#x3D;this.getNextPos() | `Coordinates`  | coordinates to move the ball to. Uses {@link Ball~setPos} | *Optional* |




##### Returns


- `Coordinates`  the new coordinates where the ball has been moved to




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
