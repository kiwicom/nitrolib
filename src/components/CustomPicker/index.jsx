// @flow strict
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
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
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

type Arg = {|
  onChange: (input: string) => void,
|};

type Props = {|
  openButton: React.Node | React.Node[],
  children: (arg: Arg) => React.Node,
  dataTest?: string,
  onChange: (input: string) => void,
|};

const CustomPicker = ({ openButton, children, onChange, dataTest }: Props) => (
  <Toggle>
    {({ open, onToggle }) => (
      <>
        <OpenButton onClick={onToggle} data-test={dataTest}>
          {openButton}
        </OpenButton>
        {open && (
          <ClickOutside onClickOutside={onToggle}>
            {children({
              onChange: (input: string) => {
                onChange(input);
                onToggle();
              },
            })}
          </ClickOutside>
        )}
      </>
    )}
  </Toggle>
);

export default CustomPicker;
