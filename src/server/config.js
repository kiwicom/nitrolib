// @flow strict
import fs from "fs";
import path from "path";

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
