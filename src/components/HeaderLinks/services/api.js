// @flow

const fetch = require("node-fetch");

export const getNavBarLinks = () =>
  fetch("https://brxh1qilc2.execute-api.eu-central-1.amazonaws.com/staging/navbar", {
    method: "GET",
  }).then(res => res.json());

export default {
  getNavBarLinks,
};
