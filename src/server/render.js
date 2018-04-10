// @flow
import fs from "fs-extra";
import path from "path";

import "./globals"; // Must be 1st
import markup from "./markup";
import { routes } from "./config";
import { brands, intls } from "./dataFiles";

const OUT = path.join(__dirname, "../static/pages");

const brandIds = Object.keys(brands);
const localeIds = Object.keys(intls);

function render() {
  brandIds.forEach(brandId => {
    localeIds.forEach(localeId => {
      routes.forEach(route => {
        const fileDir = path.join(OUT, brandId, localeId, route.filepath);
        fs.ensureDirSync(fileDir);

        const htmlStream = markup(route.url, brandId, localeId);
        const fileStream = fs.createWriteStream(path.join(fileDir, "index.html"));

        htmlStream.pipe(fileStream);
        fileStream.on("close", () => {
          // eslint-disable-next-line no-console
          console.log(
            `[render] Done writing - brand: ${brandId}, locale: ${localeId}, url: ${route.url}`,
          );
        });

        fileStream.on("error", err => {
          console.error("[render] Error!", err); // eslint-disable-line no-console
        });
      });
    });
  });
}

render();
