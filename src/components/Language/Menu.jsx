// @flow strict
import * as React from "react";
import * as R from "ramda";
import styled, { css } from "styled-components";

import * as fetchedContext from "../../services/fetched/context";
import Text from "../Text";
import { brandDefault } from "../../records/Brand";
import type { ThemeProps } from "../../records/Brand";
import type { Languages } from "../../records/Languages";
import mq from "../../styles/mediaQuery";
import Flex from "../../primitives/Flex";
import LanguageName from "./LanguageName";
import ContinentName from "./ContinentName";
import { getLanguageWrapperHeight, getLanguageWrapperWidth } from "./services/menu";

const MenuWrapper = styled.div`
  background-color: white;
  position: absolute;
  top: 45px;
  right: 20px;
  left: auto;
  display: flex;
  border-radius: 3px;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
  ${mq.ltTablet(css`
    left: 20px;
  `)};
`;

const ContinentList = styled.div`
  min-width: 200px;
  font-size: 12px;
  font-weight: 500;
  ${mq.ltTablet(css`
    display: none;
  `)};
`;

type ActiveProps = ThemeProps & {|
  active: boolean,
|};

const ContinentItem = styled(Flex)`
  background-color: ${({ theme, active }: ActiveProps) => active && theme.colors["neutral-100"]};
  color: ${({ theme, active }: ActiveProps) => active && theme.colors["primary-600"]};
  padding: 14px 16px;
  line-height: 16px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }: ActiveProps) => theme.colors["neutral-100"]};
    color: ${({ theme }: ActiveProps) => theme.colors["primary-600"]};
  }
`;

ContinentItem.defaultProps = {
  theme: brandDefault.theme,
};

const LanguageList = styled.div`
  padding: 10px;
  line-height: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: calc(100vh - 60px);
  ${mq.gtTablet(css`
    width: 560px;
  `)};
  ${mq.ltTablet(css`
    padding: 15px 12px;
  `)};
`;

type SizeProps = {|
  width: number,
  height: number,
|};

const LanguageListWrapper = styled.div`
  width: ${({ width }: SizeProps) => width};
  height: ${({ height }: SizeProps) => height};
  max-height: 682px;
  ${mq.gtTablet(css`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  `)};
`;

const LanguageItem = styled.div`
  background-color: ${({ theme, active }: ActiveProps) => active && theme.colors["primary-600"]};
  color: ${({ theme, active }: ActiveProps) => active && theme.colors.white};
  width: 33%;
  height: 26px;
  display: inline-flex;
  align-items: center;
  border-radius: 3px;
  padding-left: 5px;
  margin-bottom: 5px;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }: ActiveProps) => theme.colors["neutral-200"]};
  }
  ${mq.ltTablet(css`
    width: 100%;
  `)};
`;

LanguageItem.defaultProps = {
  theme: brandDefault.theme,
};

type Props = {|
  onChange: (lang: string) => void,
|};

type State = {|
  continent: string,
|};

export default class Menu extends React.Component<Props, State> {
  state = {
    continent: "",
  };

  getFilteredLanguages = (languages: Languages) => {
    const { continent } = this.state;

    return R.values(languages).filter(
      language => continent === "" || continent === language.continent,
    );
  };

  handleContinent = (continent: string) => {
    this.setState({ continent });
  };

  handleChange = (lang: string) => {
    const { onChange } = this.props;

    onChange(lang);
  };

  render() {
    const { continent } = this.state;

    return (
      <fetchedContext.Consumer>
        {fetched => {
          const filteredLanguages = this.getFilteredLanguages(fetched.brandLanguage.languages);

          return (
            <MenuWrapper>
              <ContinentList>
                <ContinentItem onClick={() => this.handleContinent("")}>
                  <Text t={__("common.languages_all")} />
                </ContinentItem>
                {fetched.brandLanguage.continents.map(item => (
                  <ContinentItem
                    onClick={() => this.handleContinent(item)}
                    key={item}
                    active={item === continent}
                  >
                    <ContinentName id={item} />
                  </ContinentItem>
                ))}
              </ContinentList>
              <LanguageList>
                <LanguageListWrapper
                  height={getLanguageWrapperHeight(filteredLanguages)}
                  width={getLanguageWrapperWidth(filteredLanguages)}
                >
                  {filteredLanguages.map(language => (
                    <LanguageItem key={language.id} onClick={() => this.handleChange(language.id)}>
                      <LanguageName language={language} key={language.id} />
                    </LanguageItem>
                  ))}
                </LanguageListWrapper>
              </LanguageList>
            </MenuWrapper>
          );
        }}
      </fetchedContext.Consumer>
    );
  }
}