// @flow strict
import * as R from "ramda";
import isBefore from "date-fns/isBefore";
import subMonths from "date-fns/subMonths";

import * as local from "../local";
import * as session from "../session";

const UTMs = {
  utm_source: "",
  utm_medium: "",
  utm_term: "",
  utm_content: "",
  utm_campaign: "",
  mkt_route: "",
  mkt_postback: "",
  mkt_origin: "",
  mkt_form: "",
  mkt_agency: "",
};

const UTM_TMs = {
  utm_tm_source: "",
  utm_tm_medium: "",
  utm_tm_component: "",
  utm_tm_content: "",
  utm_tm_campaign: "",
  utm_tm_version: "",
};

type Query = { [key: string]: string | string[] };
type UTM = { [key: string]: string };

const loadURL = (query: Query, utms: UTM) =>
  R.compose(
    R.filter(Boolean),
    R.mapObjIndexed((_, key) => query[key]),
  )(utms);

const loadStorage = () =>
  R.compose(
    R.map(
      R.compose(
        R.prop("value"),
        JSON.parse,
      ),
    ),
    R.filter(Boolean),
    R.mapObjIndexed((_, key) => local.load(key) || ""), // || "" due to Flow
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
    R.mapObjIndexed((_, key) => local.load(key) || ""), // || "" due to Flow
  )(UTMs);

const saveLocalStorage = (utms: Query) =>
  R.compose(
    R.forEachObjIndexed((val, key) => {
      local.save(key, JSON.stringify(val));
    }),
    R.map(value => ({ value, createdAt: new Date() })),
  )(utms);

const saveSessionStorage = (utms: Query) =>
  R.forEachObjIndexed((val, key) => {
    session.save(key, JSON.stringify(val));
  }, utms);

const handleUTMs = (query: Query): UTM => {
  clearStorage(); // Removes outdated UTMs

  const strings = R.map(String, query);

  const utms = loadURL(strings, UTMs);
  const utmTms = loadURL(strings, UTM_TMs);
  const fromStorage = loadStorage();

  saveLocalStorage(utms);
  saveSessionStorage(utmTms);

  return { ...fromStorage, ...utmTms, ...utms };
};

export default handleUTMs;
