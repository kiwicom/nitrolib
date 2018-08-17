// @flow strict
/* eslint-disable react/no-danger */
import * as React from "react";
import * as ReactDOM from "react-dom/server";
import * as R from "ramda";

import type { Values } from "../../services/intl/translate";
import { Consumer } from "../../services/intl/context";

type Props = {
  t: string,
  values: Values,
  html: boolean,
};

const Text = (props: Props) => (
  <Consumer>
    {intl =>
      props.html ? (
        <span
          dangerouslySetInnerHTML={{
            __html: intl.translate(props.t, R.map(ReactDOM.renderToStaticMarkup, props.values)),
          }}
        />
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
