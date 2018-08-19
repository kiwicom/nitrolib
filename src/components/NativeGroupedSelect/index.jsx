// @flow strict
import * as React from "react";
import styled from "styled-components";

import { themeDefault } from "records/Theme";
import type { ThemeProps } from "records/Theme";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

type SelectProps = {|
  ...ThemeProps,
  hasIcon: boolean,
|};

const Select = styled.select`
  position: absolute;
  appearance: none;
  cursor: pointer;
  background-color: transparent;
  border: 0;
  outline: 0;
  padding-left: ${({ hasIcon }: SelectProps) => (hasIcon ? "35px" : "0")};
  font-size: 12px;
  line-height: 21px;
  font-weight: 500;
  color: ${({ theme }: SelectProps) => theme.orbit.paletteInkDark};
  font-family: "Helvetica Neue", "Calibri Light", Roboto, sans-serif;
  letter-spacing: 0.02em;
  &:hover {
    color: ${({ theme }: SelectProps) => theme.orbit.paletteProductNormal};
  }
`;

Select.defaultProps = {
  theme: themeDefault,
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
  divider: ?string,
  onChange: (value: string) => void,
|};

const NativeGroupedSelect = ({ icon, value, groups, divider, onChange }: Props) => (
  <Container>
    {icon}
    <Select
      value={value}
      onChange={(ev: SyntheticInputEvent<HTMLSelectElement>) => onChange(ev.target.value)}
      hasIcon={Boolean(icon)}
    >
      {groups.filter(group => group.items.length > 0).map((group, index) => (
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
};

export default NativeGroupedSelect;
