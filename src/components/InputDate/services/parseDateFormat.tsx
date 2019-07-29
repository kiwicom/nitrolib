import * as R from "ramda";

const parseDateFormat: (langFormat: string) => string[] = R.pipe(
  R.toUpper,
  R.replace(/[^DMY]/g, ),
  R.split(),
  R.uniq,
);

export default parseDateFormat;
