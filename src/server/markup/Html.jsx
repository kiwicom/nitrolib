// @flow strict
/* eslint-disable react/no-danger */
import * as React from "react";

import type { Brand } from "public/records/Brand";
import type { Intl } from "public/records/Intl";
import type { Fetched } from "public/records/Fetched";
import type { Assets } from "../config";

const globalCss = `
  body {
    color: #212121;
    font-family: "Helvetica Neue", "Calibri Light", Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    letter-spacing: 0.02em;
  }

  *, *:before, *:after {
    box-sizing: border-box;
  }
`;

type Props = {
  root: string,
  css: React.Node,
  assets: Assets,
  brand: Brand,
  intl: Intl,
  fetched: Fetched,
};

const Html = ({ root, css, assets, brand, intl, fetched }: Props) => (
  <html lang="en">
    <head>
      <title>Reactizer</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {assets.vendor && <link rel="preload" href={assets.vendor.js} as="script" />}
      <link rel="preload" href={assets.bundle.js} as="script" />

      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css"
        rel="stylesheet"
      />
      <style dangerouslySetInnerHTML={{ __html: globalCss }} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.__BRAND__ = ${JSON.stringify(brand)};
            window.__INTL__ = ${JSON.stringify(intl)};
            window.__FETCHED__ = ${JSON.stringify(fetched)};
         `,
        }}
      />
      {css}
    </head>
    <body>
      <div id="react" dangerouslySetInnerHTML={{ __html: root }} />
      <div id="modal" />

      {assets.vendor && <script src={assets.vendor.js} />}
      <script src={assets.bundle.js} />
    </body>
  </html>
);

export default Html;
