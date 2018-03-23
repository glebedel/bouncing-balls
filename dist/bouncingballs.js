!function(root, factory) {
    "object" == typeof exports && "object" == typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define("BouncingBalls", [], factory) : "object" == typeof exports ? exports.BouncingBalls = factory() : root.BouncingBalls = factory();
}("undefined" != typeof self ? self : this, function() {
    return function(modules) {
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) return installedModules[moduleId].exports;
            var module = installedModules[moduleId] = {
                i: moduleId,
                l: !1,
                exports: {}
            };
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            module.l = !0;
            return module.exports;
        }
        var installedModules = {};
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.d = function(exports, name, getter) {
            __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
                configurable: !1,
                enumerable: !0,
                get: getter
            });
        };
        __webpack_require__.n = function(module) {
            var getter = module && module.__esModule ? function() {
                return module.default;
            } : function() {
                return module;
            };
            __webpack_require__.d(getter, "a", getter);
            return getter;
        };
        __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        };
        __webpack_require__.p = "";
        return __webpack_require__(__webpack_require__.s = "./src/index.js");
    }({
        "./src/BouncingBalls.js": function(module, exports, __webpack_require__) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.default = void 0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1;
                        descriptor.configurable = !0;
                        "value" in descriptor && (descriptor.writable = !0);
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    protoProps && defineProperties(Constructor.prototype, protoProps);
                    staticProps && defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }(), _Colors = __webpack_require__("./src/Colors.js"), Ball = function() {
                function Ball(position) {
                    var _ref = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, _ref$radius = _ref.radius, radius = void 0 === _ref$radius ? 10 : _ref$radius, _ref$color = _ref.color, color = void 0 === _ref$color ? (0, 
                    _Colors.randomColor)() : _ref$color, _ref$gravity = _ref.gravity, gravity = void 0 === _ref$gravity ? 1 : _ref$gravity, _ref$speed = _ref.speed, speed = void 0 === _ref$speed ? 5 : _ref$speed, _ref$gravityDecayRati = _ref.gravityDecayRatio, gravityDecayRatio = void 0 === _ref$gravityDecayRati ? 1.02 : _ref$gravityDecayRati, velocity = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {
                        x: 2 * (Math.random() - .5),
                        y: 2 * (Math.random() - .5),
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
                    this.pos = position || {
                        x: this.radius,
                        y: this.radius
                    };
                    this.color = color;
                }
                _createClass(Ball, [ {
                    key: "getNextPos",
                    value: function() {
                        var aggregate = this.aggregateForces();
                        return {
                            x: this.pos.x + aggregate.x * this.speed,
                            y: this.pos.y + aggregate.y * this.speed
                        };
                    }
                }, {
                    key: "setPos",
                    value: function(position) {
                        this.pos = position;
                    }
                }, {
                    key: "aggregateForces",
                    value: function() {
                        var _this = this, aggregate = {
                            x: 0,
                            y: 0
                        };
                        Object.keys(this.forces).forEach(function(key) {
                            var _forces$key = _this.forces[key], x = _forces$key.x, y = _forces$key.y;
                            aggregate.x += x || 0;
                            aggregate.y += y || 0;
                        });
                        return aggregate;
                    }
                }, {
                    key: "decayForces",
                    value: function() {
                        var _this2 = this;
                        Object.keys(this.forces).forEach(function(key) {
                            var force = _this2.forces[key];
                            force.x *= force.decayRatio || 1;
                            force.y *= force.decayRatio || 1;
                        });
                    }
                }, {
                    key: "moveNext",
                    value: function() {
                        var nextPos = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.getNextPos();
                        this.setPos(nextPos);
                        this.decayForces();
                        return nextPos;
                    }
                } ]);
                return Ball;
            }(), BouncingBalls = function() {
                function BouncingBalls() {
                    var _ref2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, _ref2$canvas = _ref2.canvas, canvas = void 0 === _ref2$canvas ? window.document.createElement("canvas") : _ref2$canvas, _ref2$container = _ref2.container, container = void 0 === _ref2$container ? window.document.body : _ref2$container, _ref3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, _ref3$gravity = _ref3.gravity, gravity = void 0 === _ref3$gravity ? 1 : _ref3$gravity, _ref3$speed = _ref3.speed, speed = void 0 === _ref3$speed ? 5 : _ref3$speed, _ref3$radius = _ref3.radius, radius = void 0 === _ref3$radius ? 10 : _ref3$radius, _ref3$gravityDecayRat = _ref3.gravityDecayRatio, gravityDecayRatio = void 0 === _ref3$gravityDecayRat ? 1.02 : _ref3$gravityDecayRat, _ref3$bounceDecayRati = _ref3.bounceDecayRatio, bounceDecayRatio = void 0 === _ref3$bounceDecayRati ? .965 : _ref3$bounceDecayRati, _ref3$click = _ref3.click, click = void 0 === _ref3$click || _ref3$click, _ref3$collisionRatio = _ref3.collisionRatio, collisionRatio = void 0 === _ref3$collisionRatio ? .98 : _ref3$collisionRatio, _ref3$drawInterval = _ref3.drawInterval, drawInterval = void 0 === _ref3$drawInterval ? 20 : _ref3$drawInterval, _ref3$canvasClass = _ref3.canvasClass, canvasClass = void 0 === _ref3$canvasClass ? "bouncing-balls-canvas" : _ref3$canvasClass;
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
                    this.balls = [];
                    if (!this.canvas.parentElement && this.container) {
                        this.canvas.classList.add(canvasClass);
                        this.container.appendChild(canvas);
                        this.canvas.width = this.container.clientWidth;
                        this.canvas.height = this.container.clientHeight;
                    }
                    if (click) {
                        this.canvas.removeEventListener("click", this.ballMouseHandler);
                        this.canvas.addEventListener("click", this.ballMouseHandler);
                    }
                }
                _createClass(BouncingBalls, [ {
                    key: "drawBall",
                    value: function(ball) {
                        var ctx = this.canvas.getContext("2d");
                        ctx.beginPath();
                        ctx.arc(ball.pos.x, ball.pos.y, ball.radius, 0, 2 * Math.PI, !1);
                        ctx.fillStyle = ball.color;
                        ctx.fill();
                        ctx.closePath();
                    }
                }, {
                    key: "isDrawing",
                    value: function() {
                        return !!this.drawing;
                    }
                }, {
                    key: "stop",
                    value: function() {
                        if (this.drawing) {
                            clearTimeout(this.drawing);
                            this.drawing = null;
                        }
                    }
                }, {
                    key: "start",
                    value: function() {
                        if (!this.drawing) {
                            console.info("start drawing balls");
                            this.draw(!0);
                        }
                        return this.drawing;
                    }
                }, {
                    key: "moveBall",
                    value: function(ball) {
                        var nextPos = ball.getNextPos();
                        if (nextPos.y > this.canvas.height - ball.radius) {
                            var aggregate = ball.aggregateForces(), bounce = aggregate.y - ball.gravity + 2 * ball.gravity, bounceForce = {
                                x: 0,
                                y: -bounce,
                                decayRatio: this.settings.bounceDecayRatio
                            };
                            ball.forces.bounce = bounceForce;
                            ball.forces.velocity.x *= this.settings.collisionRatio;
                            ball.forces.velocity.y = 0;
                            ball.forces.gravity.y = ball.gravity;
                            nextPos.y = this.canvas.height - ball.radius;
                        }
                        if (nextPos.x > this.canvas.width - ball.radius) {
                            ball.forces.velocity.x *= -1 * this.settings.collisionRatio;
                            nextPos = ball.getNextPos();
                            nextPos.x = this.canvas.width - ball.radius;
                        } else if (nextPos.x - ball.radius < 0) {
                            ball.forces.velocity.x *= -1 * this.settings.collisionRatio;
                            nextPos = ball.getNextPos();
                            nextPos.x = ball.radius;
                        }
                        return ball.moveNext(nextPos);
                    }
                }, {
                    key: "addBall",
                    value: function() {
                        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                        var ball = new (Function.prototype.bind.apply(Ball, [ null ].concat(args)))();
                        this.balls.push(ball);
                        this.start();
                        return ball;
                    }
                }, {
                    key: "draw",
                    value: function() {
                        var _this3 = this, triggered = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                        if (this.drawing || triggered) {
                            var ctx = this.canvas.getContext("2d");
                            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                            ctx.save();
                            this.balls.forEach(function(ball) {
                                _this3.moveBall(ball);
                                _this3.drawBall(ball);
                            });
                            this.drawing = setTimeout(function() {
                                return _this3.draw();
                            }, this.settings.drawInterval || 0);
                        }
                    }
                } ]);
                return BouncingBalls;
            }(), _initialiseProps = function() {
                var _this4 = this;
                this.ballMouseHandler = function(e) {
                    var x = (_this4.canvas.getBoundingClientRect(), e.offsetX), y = e.offsetY, _settings = _this4.settings, gravity = _settings.gravity, speed = _settings.speed, gravityDecayRatio = _settings.gravityDecayRatio, radius = _settings.radius, radians = Math.ceil(360 * Math.random()) * Math.PI / 180;
                    return _this4.addBall({
                        x: x,
                        y: y
                    }, {
                        gravity: gravity,
                        speed: speed,
                        gravityDecayRatio: gravityDecayRatio,
                        radius: radius
                    }, {
                        x: Math.cos(radians),
                        y: -Math.sin(radians) - gravity,
                        decayRatio: .99
                    });
                };
            };
            exports.default = BouncingBalls;
        },
        "./src/Colors.js": function(module, exports, __webpack_require__) {
            "use strict";
            function randomColor() {
                return ColorsArray[Math.floor(Math.random() * ColorsArray.length)];
            }
            var Colors = {
                black: "#000000",
                blue: "#0000ff",
                brown: "#a52a2a",
                darkblue: "#00008b",
                darkgrey: "#a9a9a9",
                darkgreen: "#006400",
                darkkhaki: "#bdb76b",
                darkmagenta: "#8b008b",
                darkolivegreen: "#556b2f",
                darkorange: "#ff8c00",
                darkorchid: "#9932cc",
                darkred: "#8b0000",
                darksalmon: "#e9967a",
                darkviolet: "#9400d3",
                fuchsia: "#ff00ff",
                gold: "#ffd700",
                green: "#008000",
                indigo: "#4b0082",
                khaki: "#f0e68c",
                magenta: "#ff00ff",
                maroon: "#800000",
                olive: "#808000",
                orange: "#ffa500",
                pink: "#ffc0cb",
                purple: "#800080",
                violet: "#800080",
                red: "#ff0000"
            }, ColorsArray = Object.values(Colors);
            module.exports = {
                Colors: Colors,
                ColorsArray: ColorsArray,
                randomColor: randomColor
            };
        },
        "./src/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            var _BouncingBalls = __webpack_require__("./src/BouncingBalls.js"), _BouncingBalls2 = function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }(_BouncingBalls);
            module.exports = _BouncingBalls2.default;
        }
    });
});
//# sourceMappingURL=bouncingballs.js.map
//# sourceMappingURL=bouncingballs.js.map