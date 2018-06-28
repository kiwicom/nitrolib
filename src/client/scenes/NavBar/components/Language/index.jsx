// @flow strict
import * as React from "react";
import * as R from "ramda";
import styled from "styled-components";

import * as intlContext from "client/public/services/intl/context";
import * as fetchedContext from "client/public/services/fetched/context";
import type { ThemeProps } from "client/public/records/Brand";
import ClickOutside from "client/public/components/ClickOutside";
import LanguageName from "./LanguageName";
import Menu from "./Menu";
import LanguageNameText from "./LanguageNameText";

type State = {|
  shown: boolean,
|};

const OpenButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  &:hover {
    ${LanguageNameText} {
      color: ${({ theme }: ThemeProps) => theme.colors["primary-600"]};
    }
  }
`;

export default class Language extends React.Component<{}, State> {
  state = {
    shown: false,
  };

  handleToggle = () => {
    this.setState(state => ({ shown: !state.shown }));
  };

  render() {
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
                      <Menu />
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
