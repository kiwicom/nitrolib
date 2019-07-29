
import getBaggageSize from "../getBaggageSize";
import { baggageData } from "../../../records/__mocks__/baggageData";

describe("getBaggageSize", () => {
  test("returns proper string", () => {
    const baggageSize = getBaggageSize(baggageData.definitions.holdBag[2].restrictions, false);
    expect(baggageSize).toEqual("78 × 26 × 52 cm, 25 kg");
  });
  test("returns proper string on RTL layout", () => {
    const baggageSize = getBaggageSize(baggageData.definitions.holdBag[2].restrictions, true);
    expect(baggageSize).toEqual("25kg, 78 × 26 × 52cm");
  });
});
