import * as React from "react";
import ButtonOrbit from "@kiwicom/orbit-components/lib/Button";
import { Props as PropsOrbit } from "@kiwicom/orbit-components/lib/Button";

import Translate from "../Translate";
import { Values } from "../../services/intl/translate";

type Props = {
  ...$Diff<PropsOrbit, { children: ?React.ReactNode }>,
  t: string,
  values?: Values,
  html?: boolean,
  transform?: (value: string) => string,
};

const Button = ({ t, values, html, transform, ...orbit }: Props) => (
  <ButtonOrbit {...orbit}>
    <Translate t={t} values={values} html={html} transform={transform} />
  </ButtonOrbit>
);

export default Button;
