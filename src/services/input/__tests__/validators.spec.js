// @flow strict
import * as fns from "../validators";

describe("#validators", () => {
  test("required", () => {
    expect(fns.required("asd")).toBe("");
    expect(fns.required(123)).toBe("");
    expect(fns.required({})).toBe("");
    expect(fns.required(new Date())).toBe("");
    expect(fns.required(null)).toBe("forms.this_field_must_be_filled");
    expect(fns.required()).toBe("forms.this_field_must_be_filled");
    expect(fns.required("")).toBe("forms.this_field_must_be_filled");
    expect(fns.required(0)).toBe("forms.this_field_must_be_filled");
  });

  test("email", () => {
    expect(fns.email("lol@kek.bur")).toBe("");
    expect(fns.email("keket_@kiwi.com")).toBe("");
    expect(fns.email("asd")).toBe("booking.passenger.email.invalid");
  });

  test("iata", () => {
    expect(fns.iata("lol@kek.bur")).toBe("forms.enter_iata_code");
    expect(fns.iata("VIE")).toBe("");
  });

  test("departure", () => {
    const NOW = new Date(Date.UTC(2020, 0, 1));

    expect(fns.departure(new Date(Date.UTC(2019, 0, 1)), NOW)).toBe("common.error");
    expect(fns.departure(new Date(Date.UTC(2019, 0, 2)), NOW)).toBe("");
  });
});
