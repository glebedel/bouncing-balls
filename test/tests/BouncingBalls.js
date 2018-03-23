/* @flow */

import { expect, assert } from "chai";
import BouncingBalls from "../../src/index";

let bb1, bb2, bb3;
describe("BouncingBalls instances creation", () => {
  it("should instanciate BouncingBalls with canvas", done => {
    bb1 = new BouncingBalls({ canvas: document.createElement("canvas") });
    expect(bb1.drawing).to.be.null;
    done();
  });
  it("should instanciate BouncingBalls with a container", done => {
    const div = document.createElement("div");
    div.id = "bb-container";
    div.style.width = "600px";
    div.style.height = "300px";
    document.body && document.body.appendChild(div);
    console.debug(div.style.width);
    bb2 = new BouncingBalls({ container: div });
    console.debug(bb2.canvas.width);
    expect(bb2.canvas.width + "px").to.equal(div.style.width);
    expect(bb2.canvas.height + "px").to.equal(div.style.height);
    expect(bb2.canvas.parentElement === div).be.true;
    done();
  });
});
describe("create balls", () => {
  let b1;
  let b2;
  let pos1;
  let pos2;
  it("can add balls", done => {
    b1 = bb1.addBall();
    b2 = bb2.addBall();
    expect(bb1.balls.length).to.equal(1);
    expect(bb2.balls.length).to.equal(1);
    expect(b1.forces.velocity.x).to.be.a("number");
    expect(b2.forces.velocity.y).to.be.a("number");
    pos1 = b1.pos;
    pos2 = b2.pos;
    expect(pos1.y > 0).to.be.true;
    expect(pos2.y > 0).to.be.true;
    done();
  });
  it("started drawing", done => {
    expect(bb1.drawing).to.be.a("number");
    expect(bb2.drawing).to.be.a("number");
    done();
  });
  it("moves the balls", done => {
    setTimeout(() => {
      expect(b1.pos.y).not.equal(pos1.y);
      expect(b2.pos.y).not.equal(pos2.y);
      done();
    }, bb1.settings.drawInterval + 1);
  });
  it("ball bounces off the floor", done => {
    // move the balls very close to the floor
    b1.pos.y = bb1.canvas.height - b1.radius - 1;
    b2.pos.y = bb2.canvas.height - b2.radius - 1;
    setTimeout(() => {
      expect(b1.pos.y).to.be.lt(bb1.canvas.height - b1.radius - 1);
      expect(b2.pos.y).to.be.lt(bb2.canvas.height - b2.radius - 1);
      done();
      // wait for at least 2 draws
    }, bb1.settings.drawInterval * 10 + 1);
  });
});
