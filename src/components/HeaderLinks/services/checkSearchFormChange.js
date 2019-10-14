// @flow strict
import R from "ramda";

// Types
import type { SearchForm } from "../records/HeaderLink";

type PropsToUpdate = string | Array<string>;

const checkSearchFormChange = (
  props: SearchForm,
  prevProps: SearchForm,
  propsToUpdate: PropsToUpdate,
) => {
  // Helper to fetch either nested-prop or direct-prop
  const pathOrProp = (path, data) => R.pathOr(R.prop(path, data), path)(data);

  const diff = R.filter(
    path => pathOrProp(path, props) !== pathOrProp(path, prevProps),
    propsToUpdate,
  );

  if (diff && diff.length > 0) {
    return true;
  }

  return false;
};

export default checkSearchFormChange;
