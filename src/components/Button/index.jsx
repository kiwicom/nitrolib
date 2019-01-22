// @flow strict
/* eslint-disable react/no-danger */
import * as React from "react";
import ButtonOrbit from "@kiwicom/orbit-components/lib/Button";
import type { Props as PropsOrbit } from "@kiwicom/orbit-components/lib/Button";

import Translate from "../Translate";
import type { Values } from "../../services/intl/translate";

type Props = {|
  ...PropsOrbit,
  t: string,
  values?: Values,
  html?: boolean,
  transform?: (value: string) => string,
|};

const Button = ({ t, values, html, transform, ...orbit }: Props) => (
  <ButtonOrbit {...orbit}>
    <Translate t={t} values={values} html={html} transform={transform} />
  </ButtonOrbit>
);

export default Button;
