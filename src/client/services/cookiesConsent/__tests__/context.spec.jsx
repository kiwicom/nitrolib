// @flow strict

import * as React from "react";
import { shallow } from "enzyme";

import { Provider, Consumer } from "../context";
import * as store from "../store";

import typeof * as StoreMock from "../__mocks__/store";

const storeMock: StoreMock = store;

jest.mock("../store");

describe("#cookiesConsentContext", () => {
  beforeEach(() => {
    storeMock.saveAccepted.mockReset();
  });

  it("loads default value from store", () => {
    expect(storeMock.isAccepted).toBeCalled();
  });

  it("render", () => {
    const wrapper = shallow(
      <Provider>
        <Consumer>
          {({ isAccepted, accept }) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <a data-is-accepted={isAccepted} onClick={accept} role="button" tabIndex={0}>
              Click
            </a>
          )}
        </Consumer>
      </Provider>,
    );

    expect(wrapper).toMatchSnapshot();

    const contextValue = wrapper.prop("value");

    expect(contextValue.isAccepted).toBe(false);
    expect(typeof contextValue.accept === "function").toBe(true);
  });

  it("saves value using store", () => {
    const wrapper = shallow(
      <Provider>
        <Consumer>
          {({ isAccepted, accept }) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <a data-is-accepted={isAccepted} onClick={accept} role="button" tabIndex={0}>
              Click
            </a>
          )}
        </Consumer>
      </Provider>,
    );

    const contextValue = wrapper.prop("value");

    contextValue.accept();

    expect(storeMock.saveAccepted).toBeCalled();
  });
});
