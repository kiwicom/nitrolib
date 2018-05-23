// @flow strict
import fs from "fs";
import path from "path";
import * as R from "ramda";

import { SYSTEM_ENV } from "client/consts/system";

const assetsPath = path.join(__dirname, "../assets.json");

export type Assets = {
  bundle: { js: string },
  vendor?: { js: string },
};

function getAssets(): Assets {
  if (!fs.existsSync(assetsPath)) {
    return {
      bundle: { js: "/bundle.js" },
    };
  }

  return JSON.parse(String(fs.readFileSync(assetsPath)));
}

// $FlowFixMe: Dunno how to do this nicely
export const port = Number(process.env.PORT || 3000);

export type Route = {
  url: string,
  filepath: string,
};

export const routes: Route[] = [
  {
    url: "/",
    filepath: "",
  },
];

export const assets = getAssets();

function getSystemEnv() {
  if (R.isEmpty(process.env.IS_STAGING) && Boolean(process.env.IS_STAGING)) {
    return SYSTEM_ENV.STAGING;
  }

  return process.env.NODE_ENV === "production" ? SYSTEM_ENV.PROD : SYSTEM_ENV.DEV;
}

export const system = {
  env: getSystemEnv(),
};
