// @flow strict
import R from "ramda";

// Types
import type { SearchForm } from "../records/HeaderLink";

type PropsToUpdate = Array<Array<string>>;

const checkSearchFormChange = (
  props: SearchForm | null,
  prevProps: SearchForm | null,
  propsToUpdate: PropsToUpdate,
) => {
  const diff = R.filter(path => R.path(path, props) !== R.path(path, prevProps), propsToUpdate);

  if (diff && diff.length > 0) {
    return true;
  }

  return false;
};

export default checkSearchFormChange;
