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
        "./node_modules/process/browser.js": function(module, exports, __webpack_require__) {
            "use strict";
            function defaultSetTimout() {
                throw new Error("setTimeout has not been defined");
            }
            function defaultClearTimeout() {
                throw new Error("clearTimeout has not been defined");
            }
            function runTimeout(fun) {
                if (cachedSetTimeout === setTimeout) return setTimeout(fun, 0);
                if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
                    cachedSetTimeout = setTimeout;
                    return setTimeout(fun, 0);
                }
                try {
                    return cachedSetTimeout(fun, 0);
                } catch (e) {
                    try {
                        return cachedSetTimeout.call(null, fun, 0);
                    } catch (e) {
                        return cachedSetTimeout.call(this, fun, 0);
                    }
                }
            }
            function runClearTimeout(marker) {
                if (cachedClearTimeout === clearTimeout) return clearTimeout(marker);
                if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
                    cachedClearTimeout = clearTimeout;
                    return clearTimeout(marker);
                }
                try {
                    return cachedClearTimeout(marker);
                } catch (e) {
                    try {
                        return cachedClearTimeout.call(null, marker);
                    } catch (e) {
                        return cachedClearTimeout.call(this, marker);
                    }
                }
            }
            function cleanUpNextTick() {
                if (draining && currentQueue) {
                    draining = !1;
                    currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1;
                    queue.length && drainQueue();
                }
            }
            function drainQueue() {
                if (!draining) {
                    var timeout = runTimeout(cleanUpNextTick);
                    draining = !0;
                    for (var len = queue.length; len; ) {
                        currentQueue = queue;
                        queue = [];
                        for (;++queueIndex < len; ) currentQueue && currentQueue[queueIndex].run();
                        queueIndex = -1;
                        len = queue.length;
                    }
                    currentQueue = null;
                    draining = !1;
                    runClearTimeout(timeout);
                }
            }
            function Item(fun, array) {
                this.fun = fun;
                this.array = array;
            }
            function noop() {}
            var cachedSetTimeout, cachedClearTimeout, process = module.exports = {};
            !function() {
                try {
                    cachedSetTimeout = "function" == typeof setTimeout ? setTimeout : defaultSetTimout;
                } catch (e) {
                    cachedSetTimeout = defaultSetTimout;
                }
                try {
                    cachedClearTimeout = "function" == typeof clearTimeout ? clearTimeout : defaultClearTimeout;
                } catch (e) {
                    cachedClearTimeout = defaultClearTimeout;
                }
            }();
            var currentQueue, queue = [], draining = !1, queueIndex = -1;
            process.nextTick = function(fun) {
                var args = new Array(arguments.length - 1);
                if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
                queue.push(new Item(fun, args));
                1 !== queue.length || draining || runTimeout(drainQueue);
            };
            Item.prototype.run = function() {
                this.fun.apply(null, this.array);
            };
            process.title = "browser";
            process.browser = !0;
            process.env = {};
            process.argv = [];
            process.version = "";
            process.versions = {};
            process.on = noop;
            process.addListener = noop;
            process.once = noop;
            process.off = noop;
            process.removeListener = noop;
            process.removeAllListeners = noop;
            process.emit = noop;
            process.prependListener = noop;
            process.prependOnceListener = noop;
            process.listeners = function(name) {
                return [];
            };
            process.binding = function(name) {
                throw new Error("process.binding is not supported");
            };
            process.cwd = function() {
                return "/";
            };
            process.chdir = function(dir) {
                throw new Error("process.chdir is not supported");
            };
            process.umask = function() {
                return 0;
            };
        },
        "./node_modules/setimmediate/setImmediate.js": function(module, exports, __webpack_require__) {
            "use strict";
            (function(global, process) {
                !function(global, undefined) {
                    function setImmediate(callback) {
                        "function" != typeof callback && (callback = new Function("" + callback));
                        for (var args = new Array(arguments.length - 1), i = 0; i < args.length; i++) args[i] = arguments[i + 1];
                        var task = {
                            callback: callback,
                            args: args
                        };
                        tasksByHandle[nextHandle] = task;
                        registerImmediate(nextHandle);
                        return nextHandle++;
                    }
                    function clearImmediate(handle) {
                        delete tasksByHandle[handle];
                    }
                    function run(task) {
                        var callback = task.callback, args = task.args;
                        switch (args.length) {
                          case 0:
                            callback();
                            break;

                          case 1:
                            callback(args[0]);
                            break;

                          case 2:
                            callback(args[0], args[1]);
                            break;

                          case 3:
                            callback(args[0], args[1], args[2]);
                            break;

                          default:
                            callback.apply(undefined, args);
                        }
                    }
                    function runIfPresent(handle) {
                        if (currentlyRunningATask) setTimeout(runIfPresent, 0, handle); else {
                            var task = tasksByHandle[handle];
                            if (task) {
                                currentlyRunningATask = !0;
                                try {
                                    run(task);
                                } finally {
                                    clearImmediate(handle);
                                    currentlyRunningATask = !1;
                                }
                            }
                        }
                    }
                    if (!global.setImmediate) {
                        var registerImmediate, nextHandle = 1, tasksByHandle = {}, currentlyRunningATask = !1, doc = global.document, attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
                        attachTo = attachTo && attachTo.setTimeout ? attachTo : global;
                        "[object process]" === {}.toString.call(global.process) ? function() {
                            registerImmediate = function(handle) {
                                process.nextTick(function() {
                                    runIfPresent(handle);
                                });
                            };
                        }() : function() {
                            if (global.postMessage && !global.importScripts) {
                                var postMessageIsAsynchronous = !0, oldOnMessage = global.onmessage;
                                global.onmessage = function() {
                                    postMessageIsAsynchronous = !1;
                                };
                                global.postMessage("", "*");
                                global.onmessage = oldOnMessage;
                                return postMessageIsAsynchronous;
                            }
                        }() ? function() {
                            var messagePrefix = "setImmediate$" + Math.random() + "$", onGlobalMessage = function(event) {
                                event.source === global && "string" == typeof event.data && 0 === event.data.indexOf(messagePrefix) && runIfPresent(+event.data.slice(messagePrefix.length));
                            };
                            global.addEventListener ? global.addEventListener("message", onGlobalMessage, !1) : global.attachEvent("onmessage", onGlobalMessage);
                            registerImmediate = function(handle) {
                                global.postMessage(messagePrefix + handle, "*");
                            };
                        }() : global.MessageChannel ? function() {
                            var channel = new MessageChannel();
                            channel.port1.onmessage = function(event) {
                                runIfPresent(event.data);
                            };
                            registerImmediate = function(handle) {
                                channel.port2.postMessage(handle);
                            };
                        }() : doc && "onreadystatechange" in doc.createElement("script") ? function() {
                            var html = doc.documentElement;
                            registerImmediate = function(handle) {
                                var script = doc.createElement("script");
                                script.onreadystatechange = function() {
                                    runIfPresent(handle);
                                    script.onreadystatechange = null;
                                    html.removeChild(script);
                                    script = null;
                                };
                                html.appendChild(script);
                            };
                        }() : function() {
                            registerImmediate = function(handle) {
                                setTimeout(runIfPresent, 0, handle);
                            };
                        }();
                        attachTo.setImmediate = setImmediate;
                        attachTo.clearImmediate = clearImmediate;
                    }
                }("undefined" == typeof self ? void 0 === global ? void 0 : global : self);
            }).call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js"), __webpack_require__("./node_modules/process/browser.js"));
        },
        "./node_modules/timers-browserify/main.js": function(module, exports, __webpack_require__) {
            "use strict";
            (function(global) {
                function Timeout(id, clearFn) {
                    this._id = id;
                    this._clearFn = clearFn;
                }
                var apply = Function.prototype.apply;
                exports.setTimeout = function() {
                    return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
                };
                exports.setInterval = function() {
                    return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
                };
                exports.clearTimeout = exports.clearInterval = function(timeout) {
                    timeout && timeout.close();
                };
                Timeout.prototype.unref = Timeout.prototype.ref = function() {};
                Timeout.prototype.close = function() {
                    this._clearFn.call(window, this._id);
                };
                exports.enroll = function(item, msecs) {
                    clearTimeout(item._idleTimeoutId);
                    item._idleTimeout = msecs;
                };
                exports.unenroll = function(item) {
                    clearTimeout(item._idleTimeoutId);
                    item._idleTimeout = -1;
                };
                exports._unrefActive = exports.active = function(item) {
                    clearTimeout(item._idleTimeoutId);
                    var msecs = item._idleTimeout;
                    msecs >= 0 && (item._idleTimeoutId = setTimeout(function() {
                        item._onTimeout && item._onTimeout();
                    }, msecs));
                };
                __webpack_require__("./node_modules/setimmediate/setImmediate.js");
                exports.setImmediate = "undefined" != typeof self && self.setImmediate || void 0 !== global && global.setImmediate || void 0;
                exports.clearImmediate = "undefined" != typeof self && self.clearImmediate || void 0 !== global && global.clearImmediate || void 0;
            }).call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js"));
        },
        "./node_modules/webpack/buildin/global.js": function(module, exports, __webpack_require__) {
            "use strict";
            var g, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            g = function() {
                return this;
            }();
            try {
                g = g || Function("return this")() || (0, eval)("this");
            } catch (e) {
                "object" === ("undefined" == typeof window ? "undefined" : _typeof(window)) && (g = window);
            }
            module.exports = g;
        },
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
            }(), _timers = __webpack_require__("./node_modules/timers-browserify/main.js"), _Colors = __webpack_require__("./src/Colors.js"), Ball = function() {
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
                        return Object.values(this.forces).reduce(function(aggregate, _ref2) {
                            var x = _ref2.x, y = _ref2.y;
                            aggregate.x += x || 0;
                            aggregate.y += y || 0;
                            return aggregate;
                        }, {
                            x: 0,
                            y: 0
                        });
                    }
                }, {
                    key: "decayForces",
                    value: function() {
                        Object.values(this.forces).forEach(function(force) {
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
                function BouncingBalls(_ref3) {
                    var _this = this, _ref3$canvas = _ref3.canvas, canvas = void 0 === _ref3$canvas ? document.createElement("canvas") : _ref3$canvas, _ref3$container = _ref3.container, container = void 0 === _ref3$container ? window.document.body : _ref3$container, settings = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                        gravity: 1,
                        speed: 5,
                        bounceDecayRatio: .965,
                        gravityDecayRatio: 1.02,
                        click: !0,
                        collisionRatio: .98,
                        drawInterval: 20
                    };
                    _classCallCheck(this, BouncingBalls);
                    this.ballMouseHandler = function(e) {
                        var bound = _this.canvas.getBoundingClientRect(), x = e.pageX - bound.left, y = e.pageY - bound.top, _settings = _this.settings, gravity = _settings.gravity, speed = _settings.speed, gravityDecayRatio = _settings.gravityDecayRatio, radians = Math.ceil(360 * Math.random()) * Math.PI / 180;
                        return _this.addBall({
                            x: x,
                            y: y
                        }, {
                            gravity: gravity,
                            speed: speed,
                            gravityDecayRatio: gravityDecayRatio
                        }, {
                            x: Math.cos(radians),
                            y: -Math.sin(radians) - gravity,
                            decayRatio: .99
                        });
                    };
                    this.drawing = null;
                    this.canvas = canvas;
                    this.container = container;
                    this.balls = [];
                    this.settings = settings;
                    console.log(this.canvas.width);
                    this.canvas.width = this.canvas.width || this.container.clientWidth;
                    this.canvas.height = this.canvas.height || this.container.clientHeight;
                    if (this.settings.click) {
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
                            (0, _timers.clearTimeout)(this.drawing);
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
                        if (nextPos.x > this.canvas.width - ball.radius) ball.forces.velocity.x *= -1 * this.settings.collisionRatio; else if (nextPos.x - ball.radius < 0) {
                            ball.forces.velocity.x *= -1 * this.settings.collisionRatio;
                            nextPos = ball.getNextPos();
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
                        var _this2 = this, triggered = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                        if (this.drawing || triggered) {
                            var ctx = this.canvas.getContext("2d");
                            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                            ctx.save();
                            this.balls.forEach(function(ball) {
                                _this2.moveBall(ball);
                                _this2.drawBall(ball);
                            });
                            this.drawing = (0, _timers.setTimeout)(function() {
                                return _this2.draw();
                            }, this.settings.drawInterval || 0);
                        }
                    }
                } ]);
                return BouncingBalls;
            }();
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