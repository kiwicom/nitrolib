// @flow

const fetch = require("node-fetch");

export const getNavBarLinks = () =>
  fetch("https://ancillaries-integration.skypicker.com/navbar", {
    method: "GET",
  }).then(res => res.json());

export default {
  getNavBarLinks,
};
