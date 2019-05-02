// @flow
import getBaggageSize from "../getBaggageSize";
import { baggageData } from "../../../records/__mocks__/baggageData";

describe("getBaggageSize", () => {
  test("returns proper string", () => {
    const baggageSize = getBaggageSize(baggageData.definitions.holdBag[2].restrictions);
    expect(baggageSize).toEqual("78 x 26 x 52 cm, 25 kg");
  });
});
