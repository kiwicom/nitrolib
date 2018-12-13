// @flow strict

import Cookies from "js-cookie";

// Types
import type { Item } from "../components/Links";

type Props = {
  items: Item[],
  splitster: {},
};

export default (res: Props) => {
  Object.keys(res.splitster).forEach(item => {
    Cookies.set(item, res.splitster[item]);
  });

  return res;
};
