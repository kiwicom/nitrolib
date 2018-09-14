// @flow
import * as React from "react";
import styled from "styled-components";

import button from "../../styles/mixins/button";
import { themeDefault } from "../../records/Theme";
import type { ThemeProps } from "../../records/Theme";
import Toggle from "../Toggle";
import ClickOutside from "../ClickOutside";

const OpenButton = styled.button`
  ${button};
  display: flex;
  align-items: center;
  line-height: 50px;
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormal};

  &:hover {
    color: ${({ theme }: ThemeProps) => theme.orbit.paletteProductNormal};
  }
`;

OpenButton.defaultProps = {
  theme: themeDefault,
};

type Props = {|
  openButton: React.Node | React.Node[],
  children: React.Element<any>,
  onChange: (input: string) => void,
|};

const CustomPicker = ({ openButton, children, onChange }: Props) => (
  <Toggle>
    {({ open, onToggle }) => {
      const onChangewithToggle = input => {
        onChange(input);
        onToggle();
      };

      return (
        <>
          <OpenButton onClick={onToggle}>{openButton}</OpenButton>
          {open && (
            <ClickOutside onClickOutside={onToggle}>
              {React.cloneElement(children, { onChange: input => onChangewithToggle(input) })}
            </ClickOutside>
          )}
        </>
      );
    }}
  </Toggle>
);

export default CustomPicker;
