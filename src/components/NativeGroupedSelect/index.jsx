// @flow strict
import * as React from "react";
import styled from "styled-components";

import { themeDefault } from "../../records/Theme";
import type { ThemeProps } from "../../records/Theme";

const Container = styled.select`
  position: absolute;
  appearance: none;
  cursor: pointer;
  background-color: transparent;
  border: 0;
  outline: 0;
  padding-left: 35px;
  font-size: 12px;
  line-height: 21px;
  font-weight: 500;
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkDark};
  font-family: "Helvetica Neue", "Calibri Light", Roboto, sans-serif;
  letter-spacing: 0.02em;
  &:hover {
    color: ${({ theme }: ThemeProps) => theme.orbit.paletteProductNormal};
  }
`;

Container.defaultProps = {
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
  <>
    {icon}
    <Container
      value={value}
      onChange={(ev: SyntheticInputEvent<HTMLSelectElement>) => onChange(ev.target.value)}
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
    </Container>
  </>
);

NativeGroupedSelect.defaultProps = {
  icon: null,
  divider: "-----------------",
};

export default NativeGroupedSelect;
