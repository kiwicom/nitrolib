// @flow strict
/* eslint-disable react/no-danger */
import * as React from "react";

import type { Values } from "client/public/services/intl/translate";
import { Consumer } from "client/public/services/intl/context";

type Props = {
  t: string,
  values: Values,
  html: boolean,
};

const Text = (props: Props) => (
  <Consumer>
    {intl =>
      props.html ? (
        <span dangerouslySetInnerHTML={{ __html: intl.translate(props.t, props.values) }} />
      ) : (
        intl.translate(props.t, props.values)
      )
    }
  </Consumer>
);

Text.defaultProps = {
  values: {},
  html: false,
};

export default Text;
