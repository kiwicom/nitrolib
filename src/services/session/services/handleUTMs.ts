import * as R from "ramda";
import isBefore from "date-fns/isBefore";
import subMonths from "date-fns/subMonths";

import * as local from "../local";

const UTMs = {
  utm_source: ,
  utm_medium: ,
  utm_term: ,
  utm_content: ,
  utm_campaign: ,
  mkt_route: ,
  mkt_postback: ,
  mkt_origin: ,
  mkt_form: ,
  mkt_agency: ,
};

type Query = { [key: string]: string | string[] };
type UTM = { [key: string]: string };

const loadURL = query =>
  R.compose(
    R.filter(Boolean),
    R.mapObjIndexed((_, key) => query[key]),
  )(UTMs);

const loadStorage = () =>
  R.compose(
    R.map(
      R.compose(
        R.prop("value"),
        JSON.parse,
      ),
    ),
    R.filter(Boolean),
    R.mapObjIndexed((_, key) => local.load(key) || ), // ||  due to Flow
  )(UTMs);

const clearStorage = () =>
  R.compose(
    R.forEachObjIndexed((item, key) => {
      if (isBefore(new Date(item.createdAt), subMonths(new Date(), 1))) {
        local.remove(key);
      }
    }),
    R.map(JSON.parse),
    R.filter(Boolean),
    R.mapObjIndexed((_, key) => local.load(key) || ), // ||  due to Flow
  )(UTMs);

const saveStorage = (utms: Query) =>
  R.compose(
    R.forEachObjIndexed((val, key) => {
      local.save(key, JSON.stringify(val));
    }),
    R.map(value => ({ value, createdAt: new Date() })),
  )(utms);

const handleUTMs = (query: Query): UTM => {
  clearStorage(); // Removes outdated UTMs

  const strings = R.map(String, query);

  const fromURL = loadURL(strings);
  const fromStorage = loadStorage();

  saveStorage(fromURL); // Saves fresh UTMs

  return { ...fromURL, ...fromStorage };
};

export default handleUTMs;
