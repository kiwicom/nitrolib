import * as React from "react";
import { mount } from "enzyme";

import { Provider } from "../../../services/currency/context";
import currencies from "../../../records/__mocks__/Currencies";

import Price from "..";

const recommended = [currencies.eur, currencies.czk, currencies.gbp];

describe("#Price", () => {
  test("test price change", () => {
    const wrapper = mount(
      <Provider
        value={{
          currency: currencies.eur,
          recommended,
          available: currencies,
          onChange: jest.fn(),
        }}
      >
        <Price value={1234} />
      </Provider>,
    );

    expect(wrapper.contains("1234 €")).toBe(true);
  });
});
