export const JSON_GET = {
  Accept: "application/json",
};

export const JSON_SEND = {
  "Content-Type": "application/json",
};

export const JSON_BOTH = {
  ...JSON_GET,
  ...JSON_SEND,
};
