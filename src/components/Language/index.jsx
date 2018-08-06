// @flow strict
import * as React from "react";
import * as R from "ramda";
import styled, { css } from "styled-components";

import ClickOutside from "../ClickOutside";
import * as intlContext from "../../services/intl/context";
import * as fetchedContext from "../../services/fetched/context";
import { themeDefault } from "../../records/Theme";
import type { ThemeProps } from "../../records/Theme";
import LanguageName from "./LanguageName";
import Menu from "./Menu";
import LanguageNameText from "./LanguageNameText";
import { brandDefault } from "../../records/Brand";
import type { Languages, Language as SingleLanguage } from "../../records/Languages";
import mq from "../../styles/mediaQuery";
import config from "../../consts/config";

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
  ${mq.ltTablet(css`
    display: none;
  `)};
`;

OpenButton.defaultProps = {
  theme: brandDefault.theme,
};

const NativeSelect = styled.select`
  display: flex;
  flex-direction: row;
  align-items: center;
  appearance: none;
  cursor: pointer;
  background-color: transparent;
  border: 0;
  outline: 0;
  margin-left: 2px;
  font-size: 12px;
  font-weight: 500;
  font-family: "Helvetica Neue", "Calibri Light", Roboto, sans-serif;
  letter-spacing: 0.02em;
  -webkit-font-smoothing: antialiased;
  &:hover {
    ${LanguageNameText} {
      color: ${({ theme }: ThemeProps) => theme.colors["primary-600"]};
    }
  }
  ${mq.gtTablet(css`
    display: none;
  `)};
`;

NativeSelect.defaultProps = {
  theme: brandDefault.theme,
};

const Icon = styled.i`
  background: ${({ flagId }: { flagId: string }) =>
    `url("${config.imagesUrl}flags/32x32/${flagId}.png")`};
  align-items: center;
  height: 32px;
  width: 32px;
  transform: scale(0.7);
  ${mq.gtTablet(css`
    display: none;
  `)};
`;

const Wrapper = styled.span`
  display: flex;
  flex-direction: row;
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

  renderNative = (languages: Languages, current: SingleLanguage) => {
    const { onChange } = this.props;

    return (
      <Wrapper>
        <Icon flagId={current.flag} />
        <NativeSelect value={current.id} onChange={onChange}>
          {R.values(languages).map((language: SingleLanguage) => (
            <option key={language.id} value={language.id}>
              {language.name}
            </option>
          ))}
        </NativeSelect>
      </Wrapper>
    );
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
                  {this.renderNative(fetched.brandLanguage.languages, intl.language)}
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
