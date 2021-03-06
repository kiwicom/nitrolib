// @flow strict
import fetchMock from "fetch-mock";

import * as fns from "../phoneValidator";

describe("#phoneValidator", () => {
  beforeEach(() => {
    // $FlowExpected: jest bug
    fetchMock.reset();
  });

  const url = `https://check-phone.kiwi.com/+420773103102`;

  const response = {
    countryCallingCode: "420",
    nationalNumber: "773103102",
    number: "+420773103102",
    country: "CZ",
    type: "MOBILE",
    allowSMS: true,
    formatInternational: "+420 773 103 102",
  };

  test("call", async () => {
    // $FlowExpected: jest bug
    fetchMock.mock(url, response);

    const res = await fns.call("+420773103102").then(r => r);

    expect(res).toEqual(response);
  });

  test("phone-validated", async () => {
    // $FlowExpected: jest bug
    fetchMock.mock(url, response);

    const validate = await fns.validate("+420773103102");

    expect(validate).toEqual({ code: "cz", error: "" });
  });

  test("phone-not-validated: invalid phone", async () => {
    // $FlowExpected: jest bug
    fetchMock.mock(`https://check-phone.kiwi.com/+420774345`, {
      countryCallingCode: "420",
      nationalNumber: "774345",
      number: "+420774345",
      country: "CZ",
      allowSMS: false,
      formatInternational: "+420 774345",
    });

    const validate = await fns.validate("+420774345");

    expect(validate).toEqual({ error: "forms.errors.invalid_phone" });
  });

  test("phone-not-validated: form must be fullfield", async () => {
    // $FlowExpected: jest bug
    fetchMock.mock(`https://check-phone.kiwi.com/+42`, { status: 400 });

    const validate = await fns.validate("+42").then(r => r);

    expect(validate).toEqual({ error: "forms.errors.invalid_value" });
  });
});
