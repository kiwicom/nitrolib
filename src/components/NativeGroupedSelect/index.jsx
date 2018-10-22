// @flow strict
import * as React from "react";
import styled from "styled-components";

import { themeDefault } from "../../records/Theme";
import type { ThemeProps } from "../../records/Theme";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

type SelectProps = {|
  ...ThemeProps,
  hasIcon: boolean,
|};

const IconContainer = styled.div`
  width: 35px;
  height: 21px;
  display: flex;
  align-items: center;
`;

const Select = styled.select`
  appearance: none;
  cursor: pointer;
  background-color: transparent;
  border: 0;
  outline: 0;
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextNormal};
  line-height: 21px;
  font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightMedium};
  color: ${({ theme }: SelectProps) => theme.orbit.paletteInkNormal};
  font-family: ${({ theme }: ThemeProps) => theme.orbit.fontFamily};
  ${({ length }) => length && `width: ${7.5 * length}px`};
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

type State = {|
  valueLength: number,
|};

type Props = {|
  icon: React.Node,
  value: string,
  groups: Group[],
  divider: ?string,
  onChange: (value: string) => void,
|};

class NativeGroupedSelect extends React.Component<Props, State> {
  static defaultProps = {
    icon: null,
    divider: "-----------------",
  };

  state = {
    valueLength: 0,
  };

  node = React.createRef();

  componentDidMount() {
    const { valueLength } = this.state;
    this.setState({
      valueLength: this.selectLength(this.node) || valueLength,
    });
  }

  selectLength = (node: ?React$ElementRef<any>) =>
    node && node.options && node.options.item(0).text.length;

  render() {
    const { icon, value, groups, divider, onChange } = this.props;
    const { valueLength } = this.state;
    return (
      <Container>
        <IconContainer>{icon}</IconContainer>
        <Select
          value={value}
          length={valueLength}
          innerRef={el => {
            this.node = el;
          }}
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
        </Select>
      </Container>
    );
  }
}

export default NativeGroupedSelect;
