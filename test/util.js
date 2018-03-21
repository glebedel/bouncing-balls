/* @flow */

window.console.karma = function consoleKarma(...args) {
  const karma =
    window.karma ||
    (window.top && window.top.karma) ||
    (window.opener && window.opener.karma);
  karma.log("debug", args);
  console.log(...args); // eslint-disable-line no-console
};
