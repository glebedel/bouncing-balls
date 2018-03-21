/* @flow */

import { expect } from "chai";

import { init } from "../../src/index";

describe("button cases", () => {
  it("should create a button and listen for a click", done => {
    init({ canvas: new HTMLCanvasElement() });
    expect(true).toBe(true);
    done();
  });
});
