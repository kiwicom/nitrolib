import * as React from "react";
import styled from "styled-components";

import button from "../../styles/mixins/button";
import { themeDefault } from "../../records/Theme";
import { ThemeProps } from "../../records/Theme";
import Toggle from "../Toggle";
import ClickOutside from "../ClickOutside";

const OpenButton = styled.button`
  ${button};
  display: flex;
  align-items: center;
  background: transparent;
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormal};
  font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightMedium};
  font-family: ${({ theme }: ThemeProps) => theme.orbit.fontFamily};
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextSmall};

  &:hover {
    color: ${({ theme }: ThemeProps) => theme.orbit.paletteProductNormal};
  }
`;

OpenButton.defaultProps = {
  theme: themeDefault,
};

type Arg = {
  onChange: (input: string) => void,
};

type Props = {
  openButton: React.ReactNode | React.ReactNode[],
  onChange: (input: string) => void,
  children: (arg: Arg) => React.ReactNode,
};

const CustomPicker = ({ openButton, onChange, children }: Props) => (
  <Toggle>
    {({ open, onToggle }) => (
      <ClickOutside active={open} onClickOutside={onToggle}>
        <>
          <OpenButton onClick={onToggle}>{openButton}</OpenButton>
          {open &&
            children({
              onChange: (input: string) => {
                onChange(input);
                onToggle();
              },
            })}
        </>
      </ClickOutside>
    )}
  </Toggle>
);

export default CustomPicker;
