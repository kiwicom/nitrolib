// @flow strict
import getBrand from "../getBrand";
import { data } from "../store";
import { brandDefault } from "../../../records/Brand";

const input = {
  hostname: "kiwi.com",
  cookieBrand: "cookie",
  queryBrand: "query",
  xForwardedHost: "header",
};

const inputEmpty = {
  hostname: "kiwi.com",
  cookieBrand: null,
  queryBrand: null,
  xForwardedHost: null,
};

const brand2 = { ...brandDefault };

describe("#analyseHeaders", () => {
  const original = data.brands;
  beforeEach(() => {
    data.brands = { test: brandDefault };
  });

  afterEach(() => {
    data.brands = original;
  });

  test("query", () => {
    data.brands = { query: brand2 };

    expect(getBrand(input)).toBe(brand2);
  });

  test("query invalid", () => {
    data.brands = { kiwicom: brand2, query: brandDefault };

    expect(getBrand({ ...input, queryBrand: "yolo" })).toBe(brand2);
  });

  test("cookie", () => {
    data.brands = { cookie: brand2 };

    expect(getBrand(input)).toBe(brand2);
  });

  test("cookie invalid", () => {
    data.brands = { kiwicom: brand2, cookie: brandDefault };

    expect(getBrand({ ...input, cookieBrand: "yolo" })).toBe(brand2);
  });

  test("hostname - domain", () => {
    data.brands = { kiwicom: brand2 };

    expect(getBrand(inputEmpty)).toBe(brand2);
  });

  test("hostname - subdomain", () => {
    // $FlowExpected: domain is mandatory
    const brand = { ...brand2, id: "yolo", domain: null };
    data.brands = { yolo: brand };

    expect(getBrand({ ...inputEmpty, hostname: "yolo.kiwi.com" })).toBe(brand);
  });

  test("hostname - fallback domain", () => {
    // $FlowExpected: domain is mandatory
    const brand = { ...brand2, id: "yolo2", domain: null, fallbackDomain: "yolo.com" };
    data.brands = { yolo2: brand };

    expect(getBrand({ ...inputEmpty, hostname: "yolo.com" })).toBe(brand);
  });

  test("header", () => {
    const brand = { ...brand2, domain: "yolo.com" };
    data.brands = { yolo2: brand };

    expect(getBrand({ ...inputEmpty, xForwardedHost: "yolo.com" })).toBe(brand);
  });

  test("default", () => {
    data.brands = { kiwicom: brandDefault };

    expect(getBrand({ ...inputEmpty, hostname: "yolo.com" })).toBe(brandDefault);
  });
});
