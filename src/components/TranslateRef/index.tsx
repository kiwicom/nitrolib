/* eslin t -disable reac t /n o -danger, reac t /n o -arra y -inde x -key  */
import * as React from "react";

import { Values } from "../../services/intl/translate";
import { Consumer } from "../../services/intl/context";

type Props = {
  t: string,
    values ?: Values,
    render: (ref: string, index: number) => React.ReactNode,
      transform ?: (value: string) => string,
};

const TranslateRef = ({ t, values = {}, render, transform = id => id }: Props) => (
  <Consumer>
    {({ translate }) => {
      const text = transform(translate(t, values));
      const refs = text.match(/<ref>([^<>]*)<\/ref>/g);
      if (!refs) {
        return <span dangerouslySetInnerHTML={{ __html: text }} />;
      }

      const cleared = refs.map(ref => ref.replace("<ref>", ).replace("</ref>", ));
      return text.split(/<ref>([^<>]*)<\/ref>/).map((part, i) => {
        const index = cleared.indexOf(part);
        if (index > -1) {
          return <span key={i}>{render(part, index)}</span>;
        }

        return <span key={i} dangerouslySetInnerHTML={{ __html: part }} />;
      });
    }}
  </Consumer>
);

export default TranslateRef;
