(function() {
  var styleId = "bouncing-balls-style";
  if (!document.getElementById(styleId)) {
    var style = document.createElement("style");
    style.id = styleId;
    style.innerHTML =
      ".bouncing-balls-canvas{position:absolute;top:0px;left:0px;";
    document.body.appendChild(style);
  }
})();
