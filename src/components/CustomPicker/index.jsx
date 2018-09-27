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
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormal};

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
  onChange: (input: string) => void,
|};

const CustomPicker = ({ openButton, children, onChange }: Props) => (
  <Toggle>
    {({ open, onToggle }) => (
      <>
        <OpenButton onClick={onToggle}>{openButton}</OpenButton>
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
