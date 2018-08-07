// @flow strict
import * as React from "react";
import * as R from "ramda";
import styled from "styled-components";

import ClickOutside from "../ClickOutside";
import * as intlContext from "../../services/intl/context";
import * as fetchedContext from "../../services/fetched/context";
import { themeDefault } from "../../records/Theme";
import type { ThemeProps } from "../../records/Theme";
import LanguageName from "./LanguageName";
import Menu from "./Menu";
import LanguageNameText from "./LanguageNameText";

const OpenButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
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
  onChange: (lang: string) => void,
  flat: boolean,
|};

type State = {|
  shown: boolean,
|};

export default class Language extends React.Component<Props, State> {
  static defaultProps = {
    flat: false,
  };

  state = {
    shown: false,
  };

  handleToggle = () => {
    this.setState(state => ({ shown: !state.shown }));
  };

  render() {
    const { onChange, flat } = this.props;
    const { shown } = this.state;

    return (
      <fetchedContext.Consumer>
        {fetched => (
          <intlContext.Consumer>
            {intl =>
              R.has(intl.language.id, fetched.brandLanguage.languages) && (
                <>
                  <OpenButton onClick={this.handleToggle}>
                    <LanguageName language={fetched.brandLanguage.languages[intl.language.id]} />
                  </OpenButton>
                  {shown && (
                    <ClickOutside onClickOutside={this.handleToggle}>
                      <Menu onChange={onChange} flat={flat} />
                    </ClickOutside>
                  )}
                </>
              )
            }
          </intlContext.Consumer>
        )}
      </fetchedContext.Consumer>
    );
  }
}
