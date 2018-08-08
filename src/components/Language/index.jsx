// @flow strict
import * as React from "react";
import * as R from "ramda";
import styled, { css } from "styled-components";

import MobileSelect from "./MobileSelect";
import ClickOutside from "../ClickOutside";
import * as intlContext from "../../services/intl/context";
import * as fetchedContext from "../../services/fetched/context";
import { themeDefault } from "../../records/Theme";
import type { ThemeProps } from "../../records/Theme";
import LanguageName from "./LanguageName";
import Menu from "./Menu";
import LanguageNameText from "./LanguageNameText";
import mq from "../../styles/mediaQuery";

const OpenButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkDark};
  cursor: pointer;
  &:hover {
    ${LanguageNameText} {
      color: ${({ theme }: ThemeProps) => theme.orbit.paletteProductNormal};
    }
  }
  ${mq.ltTablet(css`
    display: none;
  `)};
`;

OpenButton.defaultProps = {
  theme: themeDefault,
};

const Wrapper = styled.span`
  display: flex;
  flex-direction: row;

  ${mq.gtTablet(css`
    display: none;
  `)};
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
                    <LanguageName language={intl.language} />
                  </OpenButton>
                  <Wrapper>
                    <MobileSelect
                      current={intl.language}
                      languages={R.values(fetched.brandLanguage.languages)}
                      onChange={onChange}
                    />
                  </Wrapper>
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
