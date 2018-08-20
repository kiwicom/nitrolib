// @flow strict
import * as React from "react";
import MdExpandMore from "react-icons/lib/md/expand-more";
import styled from "styled-components";

import borderMixin from "../../styles/mixins/border";
import { themeDefault } from "../../records/Theme";
import type { ThemeProps } from "../../records/Theme";

const Container = styled.div`
  position: relative;
`;

const StyledSelect = styled.select`
  appearance: none;
  height: 46px;
  line-height: 46px;
  background-color: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
  width: 100%;
  ${borderMixin};
  padding: 0 15px;
  cursor: pointer;

  :focus {
    outline: none;
  }
`;

StyledSelect.defaultProps = {
  theme: themeDefault,
};

const Icon = styled.span`
  pointer-events: none;
  position: absolute;
  top: 13px;
  right: 13px;
`;

Icon.defaultProps = {
  theme: themeDefault,
};

type Props = {|
  id: string,
  value: string,
  onChange: (value: SyntheticInputEvent<HTMLSelectElement>) => void,
  children: React.Node[],
|};

const Select = ({ id, value, onChange, children }: Props) => (
  <Container>
    <StyledSelect id={id} value={value} onChange={onChange} state="base">
      {children}
    </StyledSelect>
    <Icon>
      <MdExpandMore />
    </Icon>
  </Container>
);

export default Select;
