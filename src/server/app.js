// @flow strict
/* eslint-disable no-param-reassign, fp/no-mutation */
import type { Context } from "koa";

import markup from "./markup";

async function app(ctx: Context) {
  const locale = ctx.query.locale || "en"; // TODO from URL
  const brand = ctx.query.brand || "kiwicom"; // TODO dunno how yet

  ctx.status = 200;
  ctx.type = "text/html; charset=utf-8";
  ctx.body = markup(ctx.url, brand, locale);
}

export default app;
