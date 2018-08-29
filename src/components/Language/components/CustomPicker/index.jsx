// @flow strict
import * as React from "react";
import styled from "styled-components";

import button from "../../../../styles/mixins/button";
import ClickOutside from "../../../ClickOutside";
import LanguageName from "./LanguageName";
import Menu from "./Menu";
import LanguageNameText from "./LanguageNameText";
import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";
import type { LangInfo } from "../../../../records/LangInfo";
import type { Language } from "../../../../records/Languages";

const OpenButton = styled.button`
  ${button};
  display: flex;
  align-items: center;

  &:hover {
    ${LanguageNameText} {
      color: ${({ theme }: ThemeProps) => theme.orbit.paletteProductNormal};
    }
  }
`;

OpenButton.defaultProps = {
  theme: themeDefault,
};

type Props = {|
  current: LangInfo,
  languages: Language[],
  continents: string[],
  onChange: (lang: string) => void,
  flat: boolean,
|};

type State = {|
  shown: boolean,
|};

export default class CustomPicker extends React.Component<Props, State> {
  static defaultProps = {
    flat: false,
  };

  state = {
    shown: false,
  };

  handleToggle = () => {
    this.setState(state => ({ shown: !state.shown }));
  };

  handleChange = (value: string) => {
    const { onChange } = this.props;

    this.setState({ shown: false });
    onChange(value);
  };

  render() {
    const { current, languages, continents, flat } = this.props;
    const { shown } = this.state;

    return (
      <>
        <OpenButton onClick={this.handleToggle}>
          <LanguageName name={current.name} flag={current.flag} />
        </OpenButton>

        {shown && (
          <ClickOutside onClickOutside={this.handleToggle}>
            <Menu
              languages={languages}
              continents={continents}
              onChange={this.handleChange}
              flat={flat}
            />
          </ClickOutside>
        )}
      </>
    );
  }
}
