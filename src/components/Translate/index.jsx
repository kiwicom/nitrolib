// @flow strict
/* eslint-disable react/no-danger */
import * as React from "react";
import * as R from "ramda";

import type { Values } from "../../services/intl/translate";
import { useIntl } from "../../services/intl/context";

type Props = {
  t: string,
  // defaulted
  values: Values,
  html: boolean,
  transform: (value: string) => string,
};

const Translate = ({ t, values, html, transform }: Props) => {
  const intl = useIntl();
  return html ? (
    <span dangerouslySetInnerHTML={{ __html: transform(intl.translate(t, values)) }} />
  ) : (
    transform(intl.translate(t, values))
  );
};

Translate.defaultProps = {
  values: {},
  html: false,
  transform: R.identity,
};

export default Translate;
