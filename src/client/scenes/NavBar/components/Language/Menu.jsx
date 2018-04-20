// @flow strict
import * as React from "react";
import * as R from "ramda";
import styled from "styled-components";

import * as fetchedContext from "client/services/fetched/context";
import Flex from "client/primitives/Flex";
import Text from "client/components/Text";
import mq from "client/services/utils/mediaQuery";
import type { ThemeProps } from "client/records/Brand";
import type { Languages, Language } from "client/records/Languages";
import LanguageName from "./LanguageName";
import ContinentName from "./ContinentName";

// used for decide, when to render 2/3 columns
// and when to activate customHeight on Popup
const LANGUAGES_LIMIT = 5;
// width and height of language rows in px
const LANGUAGE_ROW_HEIGHT = 31;
const LANGUAGE_ROW_WIDTH = 180;

const MenuWrapper = styled.div`
  background-color: white;
  position: absolute;
  top: 45px;
  right: 20px;
  left: auto;
  display: flex;
  border-radius: 3px;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
  ${mq.ltTablet`
    left: 20px;
  `};
`;

const ContinentList = styled.div`
  min-width: 200px;
  font-size: 12px;
  font-weight: 500;
  ${mq.ltTablet`
    display: none;
  `};
`;

type ActiveProps = ThemeProps & {|
  active: boolean,
|};

const ContinentItem = styled(Flex)`
  background-color: ${(props: ActiveProps) => props.active && props.theme.colors["neutral-100"]};
  color: ${(props: ActiveProps) => props.active && props.theme.colors["primary-600"]};
  padding: 14px 16px;
  line-height: 16px;
  cursor: pointer;
  &:hover {
    background-color: ${(props: ActiveProps) => props.theme.colors["neutral-100"]};
    color: ${(props: ActiveProps) => props.theme.colors["primary-600"]};
  }
`;

const LanguageList = styled.div`
  padding: 10px;
  line-height: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: calc(100vh - 60px);
  ${mq.gtTablet`
    width: 560px;
  `};
  ${mq.ltTablet`
    padding: 15px 12px;
  `};
`;

type SizeProps = {|
  width: number,
  height: number,
|};

const LanguageListWrapper = styled.div`
  width: ${(props: SizeProps) => props.width};
  height: ${(props: SizeProps) => props.height};
  max-height: 682px;
  ${mq.gtTablet`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  `};
`;

const LanguageItem = styled.div`
  background-color: ${(props: ActiveProps) => props.active && props.theme.colors["primary-600"]};
  color: ${(props: ActiveProps) => props.active && props.theme.colors.white};
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
    background-color: ${(props: ActiveProps) => props.theme.colors["neutral-200"]};
  }
  ${mq.ltTablet`
    width: 100%;
  `};
`;

type State = {|
  continent: string,
|};

export default class Menu extends React.Component<{}, State> {
  state = {
    continent: "",
  };

  getWidthConstant = (filteredLanguages: Language[]) =>
    filteredLanguages.length < LANGUAGES_LIMIT ? 2 : 3; // 2 || 3 columns

  getLanguageWrapperHeight = (filteredLanguages: Language[]) => {
    const widthConstant = this.getWidthConstant(filteredLanguages);

    // For filtered cases - enables to wrap to (2 || 3) cols every time
    const heightConstraint =
      Math.ceil(filteredLanguages.length / widthConstant) * LANGUAGE_ROW_HEIGHT; // custom height depends on number of columns
    return filteredLanguages.length <= LANGUAGES_LIMIT // && this.props.isMobile
      ? filteredLanguages.length * LANGUAGE_ROW_HEIGHT // custom height depends on number of languages, only on mobile && when less languages than limit
      : heightConstraint;
  };

  getLanguageWrapperWidth = (filteredLanguages: Language[]) =>
    this.getWidthConstant(filteredLanguages) * LANGUAGE_ROW_WIDTH;

  handleContinent = (continent: string) => {
    this.setState({ continent });
  };

  changeLanguage = (languageId: string) => {
    const loc = window.location;
    const parts = loc.pathname.split("/");
    const restOfUrl = parts.slice(2).join("/");

    window.location.assign(`${loc.origin}/${languageId}/${restOfUrl}${loc.search}`);
  };

  filterLanguages = (languages: Languages) =>
    R.values(languages).filter(
      language => this.state.continent === "" || this.state.continent === language.continent,
    );

  render = () => (
    <fetchedContext.Consumer>
      {fetched => {
        const filteredLanguages = this.filterLanguages(fetched.languagesData.languages);
        return (
          <MenuWrapper>
            <ContinentList>
              <ContinentItem onClick={() => this.handleContinent("")}>
                <Text t={__("common.languages_all")} />
              </ContinentItem>
              {fetched.languagesData.continents.map(continent => (
                <ContinentItem
                  onClick={() => this.handleContinent(continent.id)}
                  key={continent.id}
                  active={continent.id === this.state.continent}
                >
                  <ContinentName id={continent.id} />
                </ContinentItem>
              ))}
            </ContinentList>
            <LanguageList>
              <LanguageListWrapper
                height={this.getLanguageWrapperHeight(filteredLanguages)}
                width={this.getLanguageWrapperWidth(filteredLanguages)}
              >
                {filteredLanguages.map(language => (
                  <LanguageItem key={language.id} onClick={() => this.changeLanguage(language.id)}>
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
