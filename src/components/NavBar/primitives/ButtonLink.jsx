// @flow
import type { ReactComponentFunctional } from "styled-components";

import { themeDefault } from "../../../records/Theme";
import Button from "./Button";
import type { ThemeProps } from "../../../records/Theme";

type Props = {|
  href: string,
  children: React.Node | React.Node[],
  bold?: boolean,
  primary?: boolean,
  padding?: string,
  marginLeft?: number,
  marginRight?: number,
  fontSize?: string,
  x?: string,
  y?: string,
  direction?: string,
|};

// FIXME this is utterly disgusting, but 'styled-components' typings are still insufficient
const ButtonLink: ReactComponentFunctional<Props, ThemeProps> = (Button: any).withComponent("a");

ButtonLink.defaultProps = {
  theme: themeDefault,
};

export default ButtonLink;
