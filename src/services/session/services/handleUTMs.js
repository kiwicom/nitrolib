// @flow strict
import * as R from "ramda";

import * as session from "../session";

const UTMs = {
  utm_source: "",
  utm_medium: "",
  utm_term: "",
  utm_content: "",
  utm_campaign: "",
  utm_tm_source: "",
  utm_tm_medium: "",
  utm_tm_component: "",
  utm_tm_content: "",
  utm_tm_campaign: "",
  utm_tm_version: "",
  mkt_route: "",
  mkt_postback: "",
  mkt_origin: "",
  mkt_form: "",
  mkt_agency: "",
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
    R.filter(Boolean),
    R.mapObjIndexed((_, key) => session.load(key) || ""), // || "" due to Flow
  )(UTMs);

const saveStorage = (utms: Query) =>
  R.forEachObjIndexed((val, key) => {
    session.save(key, String(val));
  }, utms);

const handleUTMs = (query: Query): UTM => {
  const strings = R.map(String, query);

  const fromURL = loadURL(strings);
  const fromStorage = loadStorage();

  saveStorage(fromURL); // Saves fresh UTMs

  return { ...fromStorage, ...fromURL };
};

export default handleUTMs;
