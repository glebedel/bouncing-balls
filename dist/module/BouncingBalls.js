"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

// import { setTimeout, clearTimeout } from "timers";


var _Colors = require("./Colors");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @classdesc Ball object to store & calculate information (mainly position) of a specific ball
 * @class Ball
 */
var Ball = function () {
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
  function Ball(position) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$radius = _ref.radius,
        radius = _ref$radius === undefined ? 10 : _ref$radius,
        _ref$color = _ref.color,
        color = _ref$color === undefined ? (0, _Colors.randomColor)() : _ref$color,
        _ref$gravity = _ref.gravity,
        gravity = _ref$gravity === undefined ? 1 : _ref$gravity,
        _ref$speed = _ref.speed,
        speed = _ref$speed === undefined ? 5 : _ref$speed,
        _ref$gravityDecayRati = _ref.gravityDecayRatio,
        gravityDecayRatio = _ref$gravityDecayRati === undefined ? 1.02 : _ref$gravityDecayRati;

    var velocity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      decayRatio: 1
    };

    _classCallCheck(this, Ball);

    this.forces = {
      gravity: {
        x: 0,
        y: gravity,
        decayRatio: gravityDecayRatio
      },
      velocity: velocity
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


  _createClass(Ball, [{
    key: "getNextPos",
    value: function getNextPos() {
      var aggregate = this.aggregateForces();
      var newPos = {
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

  }, {
    key: "setPos",
    value: function setPos(position) {
      this.pos = position;
    }
    /**
     * Sum up all x/y translations based on x/y components of each force
     * @returns {Coordinates} x/y object reflecting summed up translations
     * @memberof Ball
     */

  }, {
    key: "aggregateForces",
    value: function aggregateForces() {
      var _this = this;

      var aggregate = {
        x: 0,
        y: 0
      };
      Object.keys(this.forces).forEach(function (key) {
        var _forces$key = _this.forces[key],
            x = _forces$key.x,
            y = _forces$key.y;

        aggregate.x += x || 0;
        aggregate.y += y || 0;
      });
      return aggregate;
    }
    /**
     * apply the decay ratio of each force to their x/y components
     * @memberof Ball
     */

  }, {
    key: "decayForces",
    value: function decayForces() {
      var _this2 = this;

      Object.keys(this.forces).forEach(function (key) {
        var force = _this2.forces[key];
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

  }, {
    key: "moveNext",
    value: function moveNext() {
      var nextPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getNextPos();

      this.setPos(nextPos);
      this.decayForces();
      return nextPos;
    }
  }]);

  return Ball;
}();
/**
 * @classdesc Add bouncing balls onto a canvas
 * @export
 */


var BouncingBalls = function () {
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
  function BouncingBalls() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$canvas = _ref2.canvas,
        canvas = _ref2$canvas === undefined ? window.document.createElement("canvas") : _ref2$canvas,
        _ref2$container = _ref2.container,
        container = _ref2$container === undefined ? window.document.body : _ref2$container;

    var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref3$gravity = _ref3.gravity,
        gravity = _ref3$gravity === undefined ? 1 : _ref3$gravity,
        _ref3$speed = _ref3.speed,
        speed = _ref3$speed === undefined ? 5 : _ref3$speed,
        _ref3$radius = _ref3.radius,
        radius = _ref3$radius === undefined ? 10 : _ref3$radius,
        _ref3$gravityDecayRat = _ref3.gravityDecayRatio,
        gravityDecayRatio = _ref3$gravityDecayRat === undefined ? 1.02 : _ref3$gravityDecayRat,
        _ref3$bounceDecayRati = _ref3.bounceDecayRatio,
        bounceDecayRatio = _ref3$bounceDecayRati === undefined ? 0.965 : _ref3$bounceDecayRati,
        _ref3$click = _ref3.click,
        click = _ref3$click === undefined ? true : _ref3$click,
        _ref3$collisionRatio = _ref3.collisionRatio,
        collisionRatio = _ref3$collisionRatio === undefined ? 0.98 : _ref3$collisionRatio,
        _ref3$drawInterval = _ref3.drawInterval,
        drawInterval = _ref3$drawInterval === undefined ? 20 : _ref3$drawInterval,
        _ref3$canvasClass = _ref3.canvasClass,
        canvasClass = _ref3$canvasClass === undefined ? "bouncing-balls-canvas" : _ref3$canvasClass;

    _classCallCheck(this, BouncingBalls);

    _initialiseProps.call(this);

    this.drawing = null;
    this.canvas = canvas;
    this.container = container;
    this.settings = {
      gravity: gravity,
      radius: radius,
      speed: speed,
      gravityDecayRatio: gravityDecayRatio,
      bounceDecayRatio: bounceDecayRatio,
      collisionRatio: collisionRatio,
      drawInterval: drawInterval
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


  _createClass(BouncingBalls, [{
    key: "drawBall",
    value: function drawBall(ball) {
      var ctx = this.canvas.getContext("2d");
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

  }, {
    key: "isDrawing",
    value: function isDrawing() {
      return !!this.drawing;
    }
    /**
     * Stop the drawing loop
     * @memberof BouncingBalls
     */

  }, {
    key: "stop",
    value: function stop() {
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

  }, {
    key: "start",
    value: function start() {
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

  }, {
    key: "moveBall",
    value: function moveBall(ball) {
      var nextPos = ball.getNextPos();
      // bounce off floor
      if (nextPos.y > this.canvas.height - ball.radius) {
        var aggregate = ball.aggregateForces();
        // calculate bounce factor and add bounce force to ball
        var bounce = aggregate.y - ball.gravity + ball.gravity * 2;
        var bounceForce = {
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

  }, {
    key: "addBall",
    value: function addBall() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var ball = new (Function.prototype.bind.apply(Ball, [null].concat(args)))();
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

  }, {
    key: "draw",
    value: function draw() {
      var _this3 = this;

      var triggered = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      // if drawing is null (drawing has been stopped or isn't started) & triggered parameter is false then no draw
      if (!this.drawing && !triggered) {
        return;
      }
      // clear canvas first
      var ctx = this.canvas.getContext("2d");
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      ctx.save();
      // move and then draw each ball
      this.balls.forEach(function (ball) {
        _this3.moveBall(ball);
        _this3.drawBall(ball);
      });
      // continue draw loop
      this.drawing = setTimeout(function () {
        return _this3.draw();
      }, this.settings.drawInterval || 0);
    }
    /**
     * Ball creation mouse handler (creating the ball based on x/y position of mouse event)
     * @memberof BouncingBalls
     * @returns {Ball} ball created/added to canvas
     */

  }]);

  return BouncingBalls;
}();

var _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this.ballMouseHandler = function (e) {
    // get click oordinates within the canvas
    var bound = _this4.canvas.getBoundingClientRect();
    var x = e.offsetX;
    var y = e.offsetY;
    var _settings = _this4.settings,
        gravity = _settings.gravity,
        speed = _settings.speed,
        gravityDecayRatio = _settings.gravityDecayRatio,
        radius = _settings.radius;
    // create random radian to derive starting x/y velocity from

    var radians = Math.ceil(Math.random() * 360) * Math.PI / 180;
    // add ball to balls array to draw
    return _this4.addBall({ x: x, y: y }, { gravity: gravity, speed: speed, gravityDecayRatio: gravityDecayRatio, radius: radius }, {
      x: Math.cos(radians),
      // since gravity can be >= sin(radian) deduct gravity from y so ball can start upwards
      y: -Math.sin(radians) - gravity,
      decayRatio: 0.99
    });
  };
};

exports["default"] = BouncingBalls;