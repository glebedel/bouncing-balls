/* @flow */

import { setInterval } from "timers";
import { randomColor } from "./Colors";

class Ball {
  constructor(
    canvas: HTMLCanvasElement,
    { x, y }: { x: number, y: number },
    {
      radius = 20,
      color = randomColor(),
      gravity = 5,
      speed = 1,
      collision = 0.5
    }: {
      radius: number,
      color: string,
      gravity: number,
      speed: number,
      collision: number
    } = {},
    { vx = 0, vy = 0 }: { vx: number, vy: number } = {}
  ) {
    this.forces = {
      gravity: [0, -gravity],
      velocity: [vx, vy]
    };
    this.pos = { x, y };
    this.speed = speed;
    this.collision = collision;
    this.radius = radius;
    this.color = color;
  }
  getNextPos(forces: [[number, number]] = Object.values(this.forces)) {
    const newPos = forces.reduce(
      (posObj, [x, y]) => {
        posObj.x -= x * this.speed;
        posObj.y -= y * this.speed;
        return posObj;
      },
      { ...this.pos }
    );
    return newPos;
  }
  setPos({ x, y }: { x: number, y: number }) {
    this.pos = { x, y };
  }
}
export default class BouncingBalls {
  constructor(...args) {
    this.init(args);
  }
  addBallMouseHandler = (e: MouseEvent) => {
    // get click coordinates within the canvas
    const bound = this.canvas.getBoundingClientRect();
    const x: number = e.pageX - bound.left;
    const y: number = e.pageY - bound.top;
    const { gravity, speed } = this.settings;
    // add ball to balls array to draw
    const radians = Math.ceil(Math.random() * 360) * Math.PI / 180;
    const vx = Math.cos(radians) * speed;
    const vy = Math.sin(radians) * speed;
    this.addBall({ x, y }, { gravity, speed }, { vx, vy });
    // start drawing loop if hasn't been started already
  };
  drawBall(ball: Ball) {
    const ctx = this.canvas.getContext("2d");
    // ball.setPos(ball.getNextPos());
    ctx.beginPath();
    ctx.arc(ball.pos.x, ball.pos.y, ball.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
  }
  addBall(...args): Ball {
    const ball = new Ball(this.canvas, ...args);
    this.balls.push(ball);
    if (!this.drawInterval) {
      console.log("start drawing some balls");
      this.drawInterval = setInterval(() => this.draw(), 100);
    }
    return ball;
  }
  draw() {
    const ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.save();
    this.balls.forEach(ball => this.drawBall(ball));
  }
  init(
    {
      canvas = document.createElement("canvas"),
      container = window.document.body
    }: {
      canvas: HTMLCanvasElement,
      container: HTMLElement
    },
    {
      gravity = 1,
      speed = 1,
      click = true
    }: {
      gravity: number,
      speed: number,
      click: boolean
    } = {}
  ): HTMLCanvasElement {
    this.canvas = canvas;
    this.container = container;
    this.balls = [];
    this.settings = {
      gravity,
      speed,
      click
    };
    // set bounds of canvas to its containers width/height
    this.canvas.width = this.container.clientWidth;
    this.canvas.height = this.container.clientHeight;
    // add click event handler to create balls if specified in settings
    if (this.settings.click) {
      // remove handler first in case it was already attached
      this.canvas.removeEventListener("click", this.addBallMouseHandler);
      // add click handler
      this.canvas.addEventListener("click", this.addBallMouseHandler);
    }
    return canvas;
  }
}
