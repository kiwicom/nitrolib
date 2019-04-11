// @flow strict
import getDefinitions from "../getDefinitions";
import { baggageData } from "../../../../records/__mocks__/baggageData";

const {
  definitions: { handBag, holdBag },
} = baggageData;

describe("#getDefinitions", () => {
  test("retunrs proper data", () => {
    const handBagDefinitions = getDefinitions(handBag, [0, 1, 1]);
    const holdBagDefinitions = getDefinitions(holdBag, [0, 1, 1, 2, 2, 2]);
    expect(handBagDefinitions).toHaveLength(2);
    expect(holdBagDefinitions).toHaveLength(3);

    expect(handBagDefinitions[1].amount).toEqual(2);
    expect(holdBagDefinitions[2].amount).toEqual(3);
  });
});
