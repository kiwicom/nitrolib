// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import { left } from "@kiwicom/orbit-components/lib/utils/rtl";

import { themeDefault } from "../../records/Theme";
import type { ThemeProps } from "../../records/Theme";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

type SelectProps = {|
  ...ThemeProps,
  hasIcon: boolean,
  hideNativeText: boolean,
|};

const IconContainer = styled.div`
  width: 24px;
  height: 21px;
  display: flex;
  align-items: center;
`;

const Select = styled.select`
  appearance: none;
  cursor: pointer;
  background-color: transparent;
  margin-${/* sc-custom "left" */ left}: 11px;
  border: 0;
  outline: 0;
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextNormal};
  line-height: 21px;
  font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightMedium};
  color: ${({ theme }: SelectProps) => theme.orbit.paletteInkNormal};
  font-family: ${({ theme }: ThemeProps) => theme.orbit.fontFamily};

  &:hover {
    color: ${({ theme }: SelectProps) => theme.orbit.paletteProductNormal};
  }

  ${({ hideNativeText }) =>
    hideNativeText &&
    css`
      width: 24px;
      margin-${/* sc-custom "left" */ left}: -24px;
      color: transparent;

      &:hover {
        color: transparent;
      }

      & > optgroup {
        color: initial;
      }
    `};
`;

Select.defaultProps = {
  theme: themeDefault,
  hideNativeText: false,
};

type Item = {|
  value: string,
  text: string,
|};

type Group = {|
  key: string,
  items: Item[],
|};

type Props = {|
  icon: React.Node,
  value: string,
  groups: Group[],
  divider: string,
  hideNativeText: boolean,
  onChange: (value: string) => void,
|};

const NativeGroupedSelect = ({ icon, value, groups, divider, hideNativeText, onChange }: Props) => (
  <Container>
    <IconContainer>{icon}</IconContainer>
    <Select
      value={value}
      hideNativeText={hideNativeText}
      onChange={(ev: SyntheticInputEvent<HTMLSelectElement>) => onChange(ev.target.value)}
    >
      {groups
        .filter(group => group.items.length > 0)
        .map((group, index) => (
          <optgroup key={group.key} label={index > 0 ? divider : null}>
            {group.items.map(item => (
              <option key={item.value} value={item.value}>
                {item.text}
              </option>
            ))}
          </optgroup>
        ))}
    </Select>
  </Container>
);

NativeGroupedSelect.defaultProps = {
  icon: null,
  divider: "-----------------",
  hideNativeText: false,
};

export default NativeGroupedSelect;
