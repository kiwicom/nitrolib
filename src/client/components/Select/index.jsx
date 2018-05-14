// @flow strict
import * as React from "react";
import MdExpandMore from "react-icons/lib/md/expand-more";
import styled from "styled-components";

import { border } from "client/styles";
import { brandDefault } from "../../records/Brand";
import type { ThemeProps } from "../../records/Brand";

const Container = styled.div`
  position: relative;
`;

const StyledSelect = styled.select`
  appearance: none;
  height: 46px;
  line-height: 46px;
  background-color: ${(props: ThemeProps) => props.theme.colors.white};
  width: 100%;
  border: 1px solid ${(props: ThemeProps) => props.theme.colors["grey-200"]};
  border-radius: ${border.radius}px;
  padding: 0 15px;
  cursor: pointer;

  :focus {
    outline: none;
  }
`;

StyledSelect.defaultProps = {
  theme: brandDefault.theme,
};

const Icon = styled.span`
  pointer-events: none;
  position: absolute;
  top: 13px;
  right: 13px;
`;

Icon.defaultProps = {
  theme: brandDefault.theme,
};

type Props = {|
  id: string,
  value: string,
  onChange: (value: SyntheticInputEvent<HTMLSelectElement>) => void,
  children: React.Node[],
|};

const Select = (props: Props) => (
  <Container>
    <StyledSelect id={props.id} value={props.value} onChange={props.onChange}>
      {props.children}
    </StyledSelect>
    <Icon>
      <MdExpandMore />
    </Icon>
  </Container>
);

export default Select;
