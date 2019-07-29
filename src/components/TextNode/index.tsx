/* eslint-disable react/no-danger */
import * as React from "react";
import Text from "@kiwicom/orbit-components/lib/Text";
import { Props as PropsOrbit } from "@kiwicom/orbit-components/lib/Text";

import TranslateNode from "../TranslateNode";

type Props = {
  ...$Diff<PropsOrbit, { children: React.ReactNode }>,
  t: string,
  values: { [key: string]: React.ReactNode },
  transform?: (value: string) => string,
};

const TextNode = ({ t, values, transform, ...orbit }: Props) => (
  <Text {...orbit}>
    <TranslateNode t={t} values={values} transform={transform} />
  </Text>
);

export default TextNode;
