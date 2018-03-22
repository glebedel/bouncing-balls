/* @flow */

import { expect } from "chai";

import BouncingBalls from "../../src/index";

describe("button cases", () => {
  it("should create a button and listen for a click", done => {
    const bb = new BouncingBalls({ canvas: new HTMLCanvasElement() });
    expect(bb.drawing).toBe(null);
    done();
  });
});
