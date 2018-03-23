/* @flow */

// import { setTimeout, clearTimeout } from "timers";
import { randomColor } from "./Colors";

type Force = {
  x: number,
  y: number,
  decayRatio: number
};

type Coordinates = {
  x: number,
  y: number
};

/**
 * @classdesc Ball object to store & calculate information (mainly position) of a specific ball
 * @class Ball
 */
class Ball {
  pos: Coordinates;
  radius: number;
  color: string;
  gravity: number;
  speed: number;
  forces: { [string]: Force };
  /**
   * Creates an instance of Ball.
   * @constructs Ball
   * @param {Coordinates} position
   * @param {{
   *       radius?: number,
   *       color?: string,
   *       gravity?: number,
   *       speed?: number,
   *       gravityDecayRatio?: number
   *     }} [{
   *       radius = 10,
   *       color = randomColor(),
   *       gravity = 1,
   *       speed = 5,
   *       gravityDecayRatio = 1.02
   *     }={}]
   * @param {Force} [velocity={
   *       x: (Math.random() - 0.5) * 2,
   *       y: (Math.random() - 0.5) * 2,
   *       decayRatio: 1
   *     }]
   * @memberof Ball
   */
  constructor(
    position?: Coordinates,
    {
      radius = 10,
      color = randomColor(),
      gravity = 1,
      speed = 5,
      gravityDecayRatio = 1.02
    }: {
      radius?: number,
      color?: string,
      gravity?: number,
      speed?: number,
      gravityDecayRatio?: number
    } = {},
    velocity?: Force = {
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      decayRatio: 1
    }
  ) {
    this.forces = {
      gravity: {
        x: 0,
        y: gravity,
        decayRatio: gravityDecayRatio
      },
      velocity
    };
    this.gravity = gravity;
    this.speed = speed;
    this.radius = radius;
    // default position to top left
    this.pos = position || { x: this.radius, y: this.radius };
    this.color = color;
  }
  /**
   * Get the next coordinates of the ball based on current position and forces
   * @returns {Coordinates} x/y coordinates
   * @memberof Ball
   */
  getNextPos(): Coordinates {
    const aggregate = this.aggregateForces();
    const newPos: Coordinates = {
      x: this.pos.x + aggregate.x * this.speed,
      y: this.pos.y + aggregate.y * this.speed
    };
    return newPos;
  }
  /**
   * reset the ball position
   * @param {Coordinates} position new coordinates where the ball must be set to
   * @memberof Ball
   */
  setPos(position: Coordinates) {
    this.pos = position;
  }
  /**
   * Sum up all x/y translations based on x/y components of each force
   * @returns {Coordinates} x/y object reflecting summed up translations
   * @memberof Ball
   */
  aggregateForces(): Coordinates {
    const aggregate: Coordinates = {
      x: 0,
      y: 0
    };
    Object.keys(this.forces).forEach((key: string) => {
      const { x, y }: Force = this.forces[key];
      aggregate.x += x || 0;
      aggregate.y += y || 0;
    });
    return aggregate;
  }
  /**
   * apply the decay ratio of each force to their x/y components
   * @memberof Ball
   */
  decayForces() {
    Object.keys(this.forces).forEach((key: string) => {
      const force: Force = this.forces[key];
      force.x *= force.decayRatio || 1;
      force.y *= force.decayRatio || 1;
    });
  }
  /**
   * Move the ball to the next coordinates.
   * Also apply the decay ratio to each force (see {@link Ball~decayForces}) after setting new coordinates
   * @param {Coordinates} [nextPos=this.getNextPos()] coordinates to move the ball to. Uses {@link Ball~setPos}
   * @returns {Coordinates} the new coordinates where the ball has been moved to
   * @memberof Ball
   */
  moveNext(nextPos: Coordinates = this.getNextPos()): Coordinates {
    this.setPos(nextPos);
    this.decayForces();
    return nextPos;
  }
}
/**
 * @classdesc Add bouncing balls onto a canvas
 * @export
 */
export default class BouncingBalls {
  balls: Array<Ball>;
  canvas: HTMLCanvasElement;
  container: HTMLElement;
  settings: any;
  drawing: ?TimeoutID;
  /**
   * Creates an instance of BouncingBalls.
   * @constructs BouncingBalls
   * @param {{
   *       canvas?: HTMLCanvasElement,
   *       container?: HTMLElement
   *     }} [{
   *       canvas = window.document.createElement("canvas"),
   *       container = window.document.body
   *     }={}]
   * @param {{
   *       gravity?: number,
   *       radius?: number,
   *       speed?: number,
   *       click?: boolean,
   *       gravityDecayRatio?: number,
   *       bounceDecayRatio?: number,
   *       collisionRatio?: number,
   *       drawInterval?: number,
   *       canvasClass?: string
   *     }} [{
   *       gravity = 1,
   *       speed = 5,
   *       radius = 10,
   *       gravityDecayRatio = 1.02,
   *       bounceDecayRatio = 0.965,
   *       click = true,
   *       collisionRatio = 0.98,
   *       drawInterval = 20,
   *       canvasClass = "bouncing-balls-canvas"
   *     }={}]
   * @memberof BouncingBalls
   */
  constructor(
    {
      canvas = window.document.createElement("canvas"),
      container = window.document.body
    }: {
      canvas?: HTMLCanvasElement,
      container?: HTMLElement
    } = {},
    {
      gravity = 1,
      speed = 5,
      radius = 10,
      gravityDecayRatio = 1.02,
      bounceDecayRatio = 0.965,
      click = true,
      collisionRatio = 0.98,
      drawInterval = 20,
      canvasClass = "bouncing-balls-canvas"
    }: {
      gravity?: number,
      radius?: number,
      speed?: number,
      click?: boolean,
      gravityDecayRatio?: number,
      bounceDecayRatio?: number,
      collisionRatio?: number,
      drawInterval?: number,
      canvasClass?: string
    } = {}
  ) {
    this.drawing = null;
    this.canvas = canvas;
    this.container = container;
    this.settings = {
      gravity,
      radius,
      speed,
      gravityDecayRatio,
      bounceDecayRatio,
      collisionRatio,
      drawInterval
    };
    // initialise empty array of balls (to be filled when balls will be added on canvas)
    this.balls = [];

    // if canvas doesn't have a parentElement then we insert it into the specified container and copies its w/h property;
    if (!this.canvas.parentElement && this.container) {
      this.canvas.classList.add(canvasClass);
      this.container.appendChild(canvas);
      this.canvas.width = this.container.clientWidth;
      this.canvas.height = this.container.clientHeight;
    }

    // add click event handler to create balls if specified in settings
    if (click) {
      // remove handler first in case it was already attached
      this.canvas.removeEventListener("click", this.ballMouseHandler);
      // add click handler
      this.canvas.addEventListener("click", this.ballMouseHandler);
    }
  }
  /**
   * Draw ball on BouncingBalls' canvas
   * @param {Ball} ball ball to draw
   * @memberof BouncingBalls
   */
  drawBall(ball: Ball) {
    const ctx = this.canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(ball.pos.x, ball.pos.y, ball.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
  }
  /**
   * Whether or not drawing loop is running
   * @returns {boolean} true if drawing loop is running / false otherwise
   * @memberof BouncingBalls
   */
  isDrawing(): boolean {
    return !!this.drawing;
  }
  /**
   * Stop the drawing loop
   * @memberof BouncingBalls
   */
  stop() {
    if (this.drawing) {
      clearTimeout(this.drawing);
      this.drawing = null;
    }
  }
  /**
   * start the drawing loop
   * @returns {TimeoutID} timeout id of the drawing loop
   * @memberof BouncingBalls
   */
  start(): ?TimeoutID {
    if (!this.drawing) {
      console.info("start drawing balls");
      this.draw(true);
    }
    return this.drawing;
  }
  /**
   * move a ball on the canvas to its next coordinates
   * @param {Ball} ball to move on canvas
   * @returns {Coordinates} new coordinates where the ball has been moved to
   * @memberof BouncingBalls
   */
  moveBall(ball: Ball): Coordinates {
    let nextPos = ball.getNextPos();
    // bounce off floor
    if (nextPos.y > this.canvas.height - ball.radius) {
      const aggregate: Coordinates = ball.aggregateForces();
      // calculate bounce factor and add bounce force to ball
      const bounce: number = aggregate.y - ball.gravity + ball.gravity * 2;
      const bounceForce: Force = {
        x: 0,
        y: -bounce,
        decayRatio: this.settings.bounceDecayRatio
      };
      ball.forces.bounce = bounceForce;
      // damper x velocity because of bounce
      ball.forces.velocity.x *= this.settings.collisionRatio;
      // nullify y velocity on collision (bounce takes the energy)
      ball.forces.velocity.y = 0;
      // reset gravity y translation
      ball.forces.gravity.y = ball.gravity;
      // position the ball to bottom of canvas (prevents from going through it if gravity y force stronger than bounce)
      nextPos.y = this.canvas.height - ball.radius;
    }
    // if bounce off right of canvas
    if (nextPos.x > this.canvas.width - ball.radius) {
      // inverse x translation
      ball.forces.velocity.x *= -1 * this.settings.collisionRatio;
      nextPos = ball.getNextPos();
      // resets the ball at the wall
      nextPos.x = this.canvas.width - ball.radius;
      // if bounce off left of canvas
    } else if (nextPos.x - ball.radius < 0) {
      // inverse x translation
      ball.forces.velocity.x *= -1 * this.settings.collisionRatio;
      nextPos = ball.getNextPos();
      // resets the ball at the wall
      nextPos.x = ball.radius;
    }
    return ball.moveNext(nextPos);
    // no bounce or left/right wall bounce
  }
  /**
   * add a ball on the canvas
   * @param {any} {@see Ball}
   * @returns {Ball} ball created
   * @memberof BouncingBalls
   */
  addBall(...args: Array<any>): Ball {
    const ball = new Ball(...args);
    // add ball to balls array (so we can keep track of it/move it)
    this.balls.push(ball);
    // start the drawing loop (does nothing if it's already been started)
    this.start();
    return ball;
  }
  /**
   * draw all the BouncingBalls' balls on its canvas
   * If parameter is true then it launches the drawing loop
   * @param {boolean} [triggered=false] whether or not function is being manually triggered or triggered via timeout loop
   * @memberof BouncingBalls
   */
  draw(triggered: boolean = false) {
    // if drawing is null (drawing has been stopped or isn't started) & triggered parameter is false then no draw
    if (!this.drawing && !triggered) {
      return;
    }
    // clear canvas first
    const ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.save();
    // move and then draw each ball
    this.balls.forEach(ball => {
      this.moveBall(ball);
      this.drawBall(ball);
    });
    // continue draw loop
    this.drawing = setTimeout(
      () => this.draw(),
      this.settings.drawInterval || 0
    );
  }
  /**
   * Ball creation mouse handler (creating the ball based on x/y position of mouse event)
   * @memberof BouncingBalls
   * @returns {Ball} ball created/added to canvas
   */
  ballMouseHandler = (e: MouseEvent): Ball => {
    // get click oordinates within the canvas
    const bound = this.canvas.getBoundingClientRect();
    const x: number = e.offsetX;
    const y: number = e.offsetY;
    const { gravity, speed, gravityDecayRatio, radius } = this.settings;
    // create random radian to derive starting x/y velocity from
    const radians = Math.ceil(Math.random() * 360) * Math.PI / 180;
    // add ball to balls array to draw
    return this.addBall(
      { x, y },
      { gravity, speed, gravityDecayRatio, radius },
      {
        x: Math.cos(radians),
        // since gravity can be >= sin(radian) deduct gravity from y so ball can start upwards
        y: -Math.sin(radians) - gravity,
        decayRatio: 0.99
      }
    );
  };
}
