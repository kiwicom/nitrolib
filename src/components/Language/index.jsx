// @flow strict
import * as React from "react";
import * as R from "ramda";

import * as intlContext from "../../services/intl/context";
import * as fetchedContext from "../../services/fetched/context";
import NativePicker from "./NativePicker";
import CustomPicker from "../CustomPicker";
import LanguageName from "./components/LanguageName";
import Menu from "./components/Menu";
import type { Event } from "../../records/Event";
import type { Language as LanguageType } from "../../records/Languages";

type Props = {|
  native: boolean,
  positionMenuDesktop?: number,
  positionMenuTablet?: number,
  flat: boolean,
  favorite?: LanguageType[],
  onChange: (lang: string) => void,
  onLog: (event: Event<"openLanguage">) => void,
|};

export default class Language extends React.PureComponent<Props> {
  static defaultProps = {
    native: false,
    flat: false,
  };

  handleOpen = () => {
    const { onLog } = this.props;

    onLog({ event: "openLanguage", data: null });
  };

  render() {
    const {
      onChange,
      native,
      flat,
      positionMenuDesktop,
      positionMenuTablet,
      favorite,
    } = this.props;

    return (
      <fetchedContext.Consumer>
        {fetched => (
          <intlContext.Consumer>
            {intl => {
              const current = intl.language;
              const languageMap = fetched.brandLanguage.languages;

              if (!R.has(current.id, languageMap)) {
                return null;
              }

              const languages = R.values(languageMap);

              return native ? (
                <NativePicker
                  current={current}
                  languages={languages}
                  favorite={favorite}
                  onChange={onChange}
                  onOpen={this.handleOpen}
                />
              ) : (
                <CustomPicker
                  openButton={<LanguageName name={current.name} flag={current.flag} />}
                  onChange={onChange}
                  onOpen={this.handleOpen}
                >
                  {render => (
                    <Menu
                      onChange={render.onChange}
                      languages={languages}
                      continents={fetched.brandLanguage.continents}
                      positionMenuDesktop={positionMenuDesktop || 0}
                      positionMenuTablet={positionMenuTablet || 0}
                      flat={flat}
                    />
                  )}
                </CustomPicker>
              );
            }}
          </intlContext.Consumer>
        )}
      </fetchedContext.Consumer>
    );
  }
}
