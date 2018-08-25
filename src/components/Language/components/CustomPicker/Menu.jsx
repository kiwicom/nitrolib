// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";

import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";
import { getByContinent } from "../../../../records/Languages";
import type { Language } from "../../../../records/Languages";
import mq from "../../../../styles/mediaQuery";
import Flex from "../../../../primitives/Flex";
import Text from "../../../Text";
import { getLanguageWrapperHeight, getLanguageWrapperWidth } from "../../services/menu";
import LanguageName from "./LanguageName";
import ContinentName from "./ContinentName";

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
  ${mq.gtDesktop(css`
    right: 150px;
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
  background-color: ${({ theme, active }: ActiveProps) => active && theme.orbit.paletteCloudNormal};
  color: ${({ theme, active }: ActiveProps) => active && theme.orbit.paletteProductNormal};
  padding: 14px 16px;
  line-height: 16px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }: ActiveProps) => theme.orbit.paletteCloudNormal};
    color: ${({ theme }: ActiveProps) => theme.orbit.paletteProductNormal};
  }
`;

ContinentItem.defaultProps = {
  theme: themeDefault,
};

type FlatProps = {|
  flat: boolean,
|};

const LanguageList = styled.div`
  padding: 10px;
  line-height: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: calc(100vh - 60px);
  ${({ flat }: FlatProps) =>
    !flat &&
    mq.gtTablet(css`
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
  width: ${({ width }: SizeProps) => width}px;
  height: ${({ height }: SizeProps) => height}px;
  max-height: 682px;
  ${mq.gtTablet(css`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  `)};
`;

const LanguageItem = styled.div`
  background-color: ${({ theme, active }: ActiveProps) =>
    active && theme.orbit.paletteProductNormal};
  color: ${({ theme, active }: ActiveProps) => active && theme.orbit.paletteWhite};
  width: 180px;
  height: 26px;
  display: inline-flex;
  align-items: center;
  border-radius: 3px;
  padding-left: 5px;
  margin-bottom: 5px;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }: ActiveProps) => theme.orbit.paletteCloudNormalHover};
  }
  ${mq.ltTablet(css`
    width: 100%;
  `)};
`;

LanguageItem.defaultProps = {
  theme: themeDefault,
};

type Props = {|
  languages: Language[],
  continents: string[],
  onChange: (lang: string) => void,
  flat: boolean,
|};

type State = {|
  continent: string,
|};

export default class Menu extends React.Component<Props, State> {
  state = {
    continent: "",
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
    const { flat, languages, continents } = this.props;

    const filteredLanguages = continent === "" ? languages : getByContinent(languages, continent);

    return (
      <MenuWrapper>
        {!flat && (
          <ContinentList>
            <ContinentItem onClick={() => this.handleContinent("")}>
              <Text t={__("common.languages_all")} />
            </ContinentItem>
            {continents.map(item => (
              <ContinentItem
                onClick={() => this.handleContinent(item)}
                key={item}
                active={item === continent}
              >
                <ContinentName id={item} />
              </ContinentItem>
            ))}
          </ContinentList>
        )}
        <LanguageList flat={flat}>
          <LanguageListWrapper
            height={getLanguageWrapperHeight(filteredLanguages, flat)}
            width={getLanguageWrapperWidth(filteredLanguages, flat)}
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
  }
}
