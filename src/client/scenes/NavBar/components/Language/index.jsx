// @flow strict
import * as React from "react";
import * as R from "ramda";
import styled from "styled-components";

import * as intlContext from "client/services/intl/context";
import * as fetchedContext from "client/services/fetched/context";
import type { ThemeProps } from "client/records/Brand";
import ClickOutside from "client/components/ClickOutside/index";
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
      color: ${(props: ThemeProps) => props.theme.colors["primary-600"]};
    }
  }
`;

export default class Language extends React.Component<{}, State> {
  state = {
    shown: false,
  };

  handleToggle = () => {
    this.setState({ shown: !this.state.shown });
  };

  render() {
    return (
      <fetchedContext.Consumer>
        {fetched => (
          <intlContext.Consumer>
            {intl =>
              R.has(intl.language.id, fetched.languagesData.languages) && (
                <>
                  <OpenButton onClick={this.handleToggle}>
                    <LanguageName language={fetched.languagesData.languages[intl.language.id]} />
                  </OpenButton>
                  {this.state.shown && (
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
