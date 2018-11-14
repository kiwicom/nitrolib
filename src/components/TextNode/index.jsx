// @flow strict
/* eslint-disable react/no-danger */
import * as React from "react";
import Text from "@kiwicom/orbit-components/lib/Text";
import type { Props as PropsOrbit } from "@kiwicom/orbit-components/lib/Text";

import TranslateNode from "../TranslateNode";

type Props = {|
  ...$Diff<PropsOrbit, { children: React.Node }>,
  t: string,
  values: { [key: string]: React.Node },
|};

const TextNode = ({ t, values, ...orbit }: Props) => (
  <Text {...orbit}>
    <TranslateNode t={t} values={values} />
  </Text>
);

export default TextNode;
