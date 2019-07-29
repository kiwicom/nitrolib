/* eslint-disable react/no-danger */
import * as React from "react";
import TextOrbit from "@kiwicom/orbit-components/lib/Text";
import { Props as PropsOrbit } from "@kiwicom/orbit-components/lib/Text";

import Translate from "../Translate";
import { Values } from "../../services/intl/translate";

type Props = {
  ...$Diff<PropsOrbit, { children: React.ReactNode }>,
  t: string,
  values?: Values,
  html?: boolean,
  transform?: (value: string) => string,
};

const Text = ({ t, values, html, transform, ...orbit }: Props) => (
  <TextOrbit {...orbit}>
    <Translate t={t} values={values} html={html} transform={transform} />
  </TextOrbit>
);

export default Text;
