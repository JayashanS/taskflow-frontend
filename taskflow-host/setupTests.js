import "@testing-library/jest-dom";
import "jest-canvas-mock";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        status: "OK",
        results: [{ formatted_address: "Test Address" }],
      }),
  })
);

global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;
