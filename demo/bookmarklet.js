(function() {
  var fn = function() {
    var bouncingBalls = new BouncingBalls();
  };
  var styleId = "bouncing-balls-style";
  if (!document.getElementById(styleId)) {
    var style = document.createElement("style");
    style.id = styleId;
    style.innerHTML =
      ".bouncing-balls-canvas{position:absolute;top:0px;left:0px;";
    document.body.appendChild(style);
  }
  var scriptId = "bouncing-balls-lib";
  if (!document.getElementById(script)) {
    var script = document.createElement("script");
    script.id = scriptId;
    script.type = "text/javascript";
    script.src =
      "https://rawgit.com/glebedel/bouncing-balls/master/dist/bouncingballs.js";
    document.body.appendChild(script);
    script.onload = fn;
  } else {
    fn();
  }
})();
