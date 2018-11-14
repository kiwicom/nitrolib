// @flow strict
/* eslint-disable react/no-danger */
import * as React from "react";
import TextOrbit from "@kiwicom/orbit-components/lib/Text";
import type { Props as PropsOrbit } from "@kiwicom/orbit-components/lib/Text";

import Translate from "../Translate";
import type { Values } from "../../services/intl/translate";

type Props = {|
  ...$Diff<PropsOrbit, { children: React.Node }>,
  t: string,
  values?: Values,
  html?: boolean,
|};

const Text = ({ t, values, html, ...orbit }: Props) => (
  <TextOrbit {...orbit}>
    <Translate t={t} values={values} html={html} />
  </TextOrbit>
);

export default Text;
