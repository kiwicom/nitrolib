// @flow strict
/* eslint-disable react/no-danger, react/no-array-index-key */
import * as React from "react";
import * as R from "ramda";

import { Consumer } from "../../services/intl/context";

type Props = {
  t: string,
  values: { [key: string]: React.Node },
  // defaulted
  transform: (value: string) => string,
};

const TranslateNode = ({ t, values, transform }: Props) => (
  <Consumer>
    {intl =>
      transform(intl.translate(t))
        .split("__")
        .filter(Boolean)
        .map((word, i) =>
          values[word] ? (
            <span key={i}>{values[word]}</span>
          ) : (
            <span key={i} dangerouslySetInnerHTML={{ __html: word }} />
          ),
        )
    }
  </Consumer>
);

TranslateNode.defaultProps = {
  transform: R.identity,
};

export default TranslateNode;
