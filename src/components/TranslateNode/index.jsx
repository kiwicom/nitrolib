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
    {intl => (
      <>
        {Object.keys(values).reduce(
          (words, key, i) =>
            words.map((word, j) =>
              // $FlowExpected: we're transforming string[] to React.Node[]
              word === key ? (
                <span key={`${i}-${j}`}>{values[key]}</span>
              ) : (
                <span key={`${i}-${j}`} dangerouslySetInnerHTML={{ __html: word }} />
              ),
            ),
          transform(intl.translate(t)).split("__"),
        )}
      </>
    )}
  </Consumer>
);

TranslateNode.defaultProps = {
  transform: R.identity,
};

export default TranslateNode;
