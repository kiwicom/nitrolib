// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import { right, left } from "@kiwicom/orbit-components/lib/utils/rtl";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";

import { themeDefault } from "../../../records/Theme";
import type { ThemeProps } from "../../../records/Theme";
import { getByContinent } from "../../../records/Languages";
import type { Language } from "../../../records/Languages";
import buttonMixin from "../../../styles/mixins/button";
import Translate from "../../Translate";
import * as MODALS from "../../../consts/modals";
import type { Modal as ModalType } from "../../../consts/modals";
import { getLanguageWrapperHeight, getLanguageWrapperWidth } from "../services/menu";
import LanguageName from "./LanguageName";
import ContinentName from "./ContinentName";

type FlatProps = {|
  flat: boolean,
  positionMenuTablet: number,
  positionMenuDesktop: number,
|};

const MenuWrapper = styled.div`
  background-color: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
  position: absolute;
  top: 50px;
  display: flex;
  overflow-x: hidden;
  border-radius: ${({ theme }: ThemeProps) => theme.orbit.borderRadiusNormal};
  box-shadow: ${({ theme }: ThemeProps) => theme.orbit.boxShadowRaised};
  ${({ flat }: FlatProps) =>
    !flat &&
    mq.tablet(css`
      ${({ positionMenuTablet }: FlatProps) =>
        css`
          ${/* sc-custom "right" */ right}: ${positionMenuTablet}px;
        `};
    `)};
  ${({ flat }: FlatProps) =>
    !flat &&
    mq.desktop(css`
      ${({ positionMenuDesktop }: FlatProps) =>
        css`
          ${/* sc-custom "right" */ right}: ${positionMenuDesktop}px;
        `};
    `)};
`;

MenuWrapper.defaultProps = {
  theme: themeDefault,
};

const ContinentList = styled.div`
  min-width: 200px;
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextSmall};
  font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightMedium};
  display: none;

  ${mq.tablet(
    css`
      display: block;
    `,
  )};
`;

ContinentList.defaultProps = {
  theme: themeDefault,
};

type ActiveProps = ThemeProps & {|
  active: boolean,
|};

const ContinentButton = styled.button`
  ${buttonMixin};
  display: flex;
  width: 100%;
  text-align: left;
  background: ${({ theme, active }: ActiveProps) =>
    active ? theme.orbit.paletteCloudNormal : theme.orbit.paletteWhite};
  color: ${({ theme, active }: ActiveProps) => active && theme.orbit.paletteProductNormal};
  padding: 14px 16px;
  line-height: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }: ActiveProps) => theme.orbit.paletteCloudNormal};
    color: ${({ theme }: ActiveProps) => theme.orbit.paletteProductNormal};
  }
`;

ContinentButton.defaultProps = {
  theme: themeDefault,
};

const LanguageList = styled.div`
  padding: 10px;
  line-height: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: calc(100vh - 60px);
  ${({ flat }: FlatProps) =>
    !flat &&
    mq.tablet(css`
      width: 560px;
    `)};
  ${mq.largeMobile(css`
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
  ${mq.tablet(css`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  `)};
`;

const LanguageItem = styled.div`
  background-color: ${({ theme, active }: ActiveProps) =>
    active && theme.orbit.paletteProductNormal};
  color: ${({ theme, active }: ActiveProps) => active && theme.orbit.paletteWhite};
  width: 100%;
  height: 26px;
  display: inline-flex;
  align-items: center;
  border-radius: ${({ theme }: ThemeProps) => theme.orbit.borderRadiusNormal};
  padding-${/* sc-custom "left" */ left}: 5px;
  margin-bottom: 5px;
  box-sizing: border-box;
  cursor: pointer;

  ${({ active }) =>
    !active &&
    css`
      &:hover {
        background-color: ${({ theme }: ThemeProps) => theme.orbit.paletteCloudNormalHover};
        color: ${({ theme }: ActiveProps) => theme.orbit.paletteInkNormalHover};
      }
    `}

  ${mq.tablet(css`
    width: 180px;
  `)};
`;

LanguageItem.defaultProps = {
  theme: themeDefault,
};

type Props = {|
  currentId: string,
  languages: Language[],
  continents: string[],
  flat: boolean,
  onChange: (input: string) => void,
  positionMenuDesktop: number,
  positionMenuTablet: number,
  onSetModal?: (modal: ModalType) => void,
|};

type State = {|
  continent: string,
|};

export default class Menu extends React.Component<Props, State> {
  state = {
    continent: "",
  };

  componentDidMount() {
    const { onSetModal } = this.props;
    if (onSetModal) {
      onSetModal(MODALS.LANGUAGE_MENU);
    }
  }

  componentWillUnmount() {
    const { onSetModal } = this.props;
    if (onSetModal) {
      onSetModal(MODALS.NONE);
    }
  }

  handleChange = (lang: string) => {
    const { onChange } = this.props;
    return onChange ? onChange(lang) : "eur";
  };

  handleContinent = (continent: string) => {
    this.setState({ continent });
  };

  render() {
    const { continent } = this.state;
    const {
      currentId,
      flat,
      languages,
      continents,
      positionMenuDesktop,
      positionMenuTablet,
    } = this.props;

    const filteredLanguages = continent === "" ? languages : getByContinent(languages, continent);

    return (
      <MenuWrapper
        flat={flat}
        positionMenuDesktop={positionMenuDesktop}
        positionMenuTablet={positionMenuTablet}
      >
        {!flat && (
          <ContinentList>
            <ContinentButton active={continent === ""} onClick={() => this.handleContinent("")}>
              <Translate t="common.languages_all" />
            </ContinentButton>
            {continents.map(item => (
              <ContinentButton
                key={item}
                active={item === continent}
                onClick={() => this.handleContinent(item)}
              >
                <ContinentName id={item} />
              </ContinentButton>
            ))}
          </ContinentList>
        )}
        <LanguageList flat={flat}>
          <LanguageListWrapper
            height={getLanguageWrapperHeight(filteredLanguages, flat)}
            width={getLanguageWrapperWidth(filteredLanguages, flat)}
          >
            {filteredLanguages.map(language => (
              <LanguageItem
                key={language.id}
                active={language.id === currentId}
                onClick={() => this.handleChange(language.id)}
              >
                <LanguageName language={language} />
              </LanguageItem>
            ))}
          </LanguageListWrapper>
        </LanguageList>
      </MenuWrapper>
    );
  }
}
