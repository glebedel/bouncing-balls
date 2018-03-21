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
            var _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }, _slicedToArray = function() {
                function sliceIterator(arr, i) {
                    var _arr = [], _n = !0, _d = !1, _e = void 0;
                    try {
                        for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done); _n = !0) {
                            _arr.push(_s.value);
                            if (i && _arr.length === i) break;
                        }
                    } catch (err) {
                        _d = !0;
                        _e = err;
                    } finally {
                        try {
                            !_n && _i.return && _i.return();
                        } finally {
                            if (_d) throw _e;
                        }
                    }
                    return _arr;
                }
                return function(arr, i) {
                    if (Array.isArray(arr)) return arr;
                    if (Symbol.iterator in Object(arr)) return sliceIterator(arr, i);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance");
                };
            }(), _createClass = function() {
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
                function Ball(canvas, _ref) {
                    var x = _ref.x, y = _ref.y, _ref2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, _ref2$radius = _ref2.radius, radius = void 0 === _ref2$radius ? 20 : _ref2$radius, _ref2$color = _ref2.color, color = void 0 === _ref2$color ? (0, 
                    _Colors.randomColor)() : _ref2$color, _ref2$gravity = _ref2.gravity, gravity = void 0 === _ref2$gravity ? 5 : _ref2$gravity, _ref2$speed = _ref2.speed, speed = void 0 === _ref2$speed ? 1 : _ref2$speed, _ref2$collision = _ref2.collision, collision = void 0 === _ref2$collision ? .5 : _ref2$collision, _ref3 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}, _ref3$vx = _ref3.vx, vx = void 0 === _ref3$vx ? 0 : _ref3$vx, _ref3$vy = _ref3.vy, vy = void 0 === _ref3$vy ? 0 : _ref3$vy;
                    _classCallCheck(this, Ball);
                    this.forces = {
                        gravity: [ 0, -gravity ],
                        velocity: [ vx, vy ]
                    };
                    this.pos = {
                        x: x,
                        y: y
                    };
                    this.speed = speed;
                    this.collision = collision;
                    this.radius = radius;
                    this.color = color;
                }
                _createClass(Ball, [ {
                    key: "getNextPos",
                    value: function() {
                        var _this = this;
                        return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Object.values(this.forces)).reduce(function(posObj, _ref4) {
                            var _ref5 = _slicedToArray(_ref4, 2), x = _ref5[0], y = _ref5[1];
                            posObj.x -= x * _this.speed;
                            posObj.y -= y * _this.speed;
                            return posObj;
                        }, _extends({}, this.pos));
                    }
                }, {
                    key: "setPos",
                    value: function(_ref6) {
                        var x = _ref6.x, y = _ref6.y;
                        this.pos = {
                            x: x,
                            y: y
                        };
                    }
                } ]);
                return Ball;
            }(), BouncingBalls = function() {
                function BouncingBalls() {
                    var _this2 = this;
                    _classCallCheck(this, BouncingBalls);
                    this.addBallMouseHandler = function(e) {
                        var bound = _this2.canvas.getBoundingClientRect(), x = e.pageX - bound.left, y = e.pageY - bound.top, _settings = _this2.settings, gravity = _settings.gravity, speed = _settings.speed, radians = Math.ceil(360 * Math.random()) * Math.PI / 180, vx = Math.cos(radians) * speed, vy = Math.sin(radians) * speed;
                        _this2.addBall({
                            x: x,
                            y: y
                        }, {
                            gravity: gravity,
                            speed: speed
                        }, {
                            vx: vx,
                            vy: vy
                        });
                    };
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                    this.init(args);
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
                    key: "addBall",
                    value: function() {
                        for (var _this3 = this, _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
                        var ball = new (Function.prototype.bind.apply(Ball, [ null ].concat([ this.canvas ], args)))();
                        this.balls.push(ball);
                        if (!this.drawInterval) {
                            console.log("start drawing some balls");
                            this.drawInterval = (0, _timers.setInterval)(function() {
                                return _this3.draw();
                            }, 100);
                        }
                        return ball;
                    }
                }, {
                    key: "draw",
                    value: function() {
                        var _this4 = this, ctx = this.canvas.getContext("2d");
                        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                        ctx.save();
                        this.balls.forEach(function(ball) {
                            return _this4.drawBall(ball);
                        });
                    }
                }, {
                    key: "init",
                    value: function(_ref7) {
                        var _ref7$canvas = _ref7.canvas, canvas = void 0 === _ref7$canvas ? document.createElement("canvas") : _ref7$canvas, _ref7$container = _ref7.container, container = void 0 === _ref7$container ? window.document.body : _ref7$container, _ref8 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, _ref8$gravity = _ref8.gravity, gravity = void 0 === _ref8$gravity ? 1 : _ref8$gravity, _ref8$speed = _ref8.speed, speed = void 0 === _ref8$speed ? 1 : _ref8$speed, _ref8$click = _ref8.click, click = void 0 === _ref8$click || _ref8$click;
                        this.canvas = canvas;
                        this.container = container;
                        this.balls = [];
                        this.settings = {
                            gravity: gravity,
                            speed: speed,
                            click: click
                        };
                        this.canvas.width = this.container.clientWidth;
                        this.canvas.height = this.container.clientHeight;
                        if (this.settings.click) {
                            this.canvas.removeEventListener("click", this.addBallMouseHandler);
                            this.canvas.addEventListener("click", this.addBallMouseHandler);
                        }
                        return canvas;
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
                aqua: "#00ffff",
                azure: "#f0ffff",
                beige: "#f5f5dc",
                black: "#000000",
                blue: "#0000ff",
                brown: "#a52a2a",
                cyan: "#00ffff",
                darkblue: "#00008b",
                darkcyan: "#008b8b",
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
                lightblue: "#add8e6",
                lightcyan: "#e0ffff",
                lightgreen: "#90ee90",
                lightgrey: "#d3d3d3",
                lightpink: "#ffb6c1",
                lightyellow: "#ffffe0",
                lime: "#00ff00",
                magenta: "#ff00ff",
                maroon: "#800000",
                navy: "#000080",
                olive: "#808000",
                orange: "#ffa500",
                pink: "#ffc0cb",
                purple: "#800080",
                violet: "#800080",
                red: "#ff0000",
                silver: "#c0c0c0",
                white: "#ffffff",
                yellow: "#ffff00"
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