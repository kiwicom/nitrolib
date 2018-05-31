// @flow strict
import * as R from "ramda";

const separateList = R.curry((n: number, list: any[]) => {
  const len = list.length;
  const f = (_v: any, idx: number) => Math.floor((idx * n) / len);
  return R.values(R.addIndex(R.groupBy)(f, list));
});

export default separateList;
