// @flow strict
/* eslint-disable react/no-danger */
import * as React from "react";

import type { Values } from "../../services/intl/translate";
import { Consumer } from "../../services/intl/context";

type Props = {|
  t: string,
  values?: Values,
  render: (ref: string) => React.Node,
  transform?: (value: string) => string,
|};

const TranslateRef = ({ t, values = {}, render, transform = id => id }: Props) => (
  <Consumer>
    {({ translate }) => {
      const text = transform(translate(t, values));
      const ref = text.match(/(<ref>(.*)<\/ref>)/);
      if (!ref) {
        return <span dangerouslySetInnerHTML={{ __html: text }} />;
      }

      const whole = ref[1];
      const match = ref[2];
      const [pre, post] = text.split(whole);
      return (
        <>
          <span dangerouslySetInnerHTML={{ __html: pre }} />
          {render(match)}
          <span dangerouslySetInnerHTML={{ __html: post }} />
        </>
      );
    }}
  </Consumer>
);

export default TranslateRef;
