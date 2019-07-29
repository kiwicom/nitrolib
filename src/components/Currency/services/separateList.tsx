import * as R from "ramda";

function separateList<T>(n: number, list: T[]): T[][] {
  return R.splitEvery(Math.ceil((list.length || 1) / n), list);
}

export default separateList;
