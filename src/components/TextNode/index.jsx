// @flow strict
import * as React from "react";

import { Consumer } from "../../services/intl/context";

type Props = {
  t: string,
  values: { [key: string]: React.Node },
};

const TextNode = ({ t, values }: Props) => (
  <Consumer>
    {intl => (
      <>
        {Object.keys(values).reduce(
          // $FlowFixMe we're transforming string[] to React.Node[]
          (words, key) => words.map(word => (word === key ? values[key] : word)),
          intl.translate(t).split("__"),
        )}
      </>
    )}
  </Consumer>
);

export default TextNode;
