// @flow strict
/* eslint-disable react/no-danger, react/no-array-index-key */
import * as React from "react";

import { Consumer } from "../../services/intl/context";

type Props = {
  t: string,
  values: { [key: string]: React.Node },
};

const TranslateNode = ({ t, values }: Props) => (
  <Consumer>
    {intl => (
      <>
        {Object.keys(values).reduce(
          (words, key, i) =>
            words.map(
              word =>
                // $FlowExpected: we're transforming string[] to React.Node[]
                word === key ? (
                  <span key={i}>{values[key]}</span>
                ) : (
                  <span key={i} dangerouslySetInnerHTML={{ __html: word }} />
                ),
            ),
          intl.translate(t).split("__"),
        )}
      </>
    )}
  </Consumer>
);

export default TranslateNode;
