// @flow strict
/* eslint-disable react/no-danger */
import * as React from "react";

import type { Values } from "../../services/intl/translate";
import { Consumer } from "../../services/intl/context";

type Props = {
  t: string,
  values: Values,
  html: boolean,
};

const Translate = (props: Props) => (
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

Translate.defaultProps = {
  values: {},
  html: false,
};

export default Translate;
