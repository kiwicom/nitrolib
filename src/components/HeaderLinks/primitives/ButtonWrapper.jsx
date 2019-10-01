// @flow strict
import styled from "styled-components";

import type { ThemeProps } from "../../../records/Theme";
import { pseudoBorder } from "../../../styles/mixins/border";

type WrapperProps = {|
  ...ThemeProps,
  active: boolean,
  newDesign: boolean,
|};

const Wrapper = styled.div`
  position: relative;

  &:hover {
    ${pseudoBorder};
  }

  ${({ active }: WrapperProps) => active && pseudoBorder};
`;

export default Wrapper;
