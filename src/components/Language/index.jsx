// @flow strict
import * as React from "react";
import * as R from "ramda";

import * as intlContext from "../../services/intl/context";
import * as fetchedContext from "../../services/fetched/context";
import NativePicker from "./NativePicker";
import CustomPicker from "../CustomPicker";
import LanguageName from "./components/LanguageName";
import Menu from "./components/Menu";

type Props = {|
  onChange: (lang: string) => void,
  native: boolean,
  positionMenuDesktop?: number,
  positionMenuTablet?: number,
  flat: boolean,
|};

const Language = ({ onChange, native, flat, positionMenuDesktop, positionMenuTablet }: Props) => (
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
            <NativePicker current={current} languages={languages} onChange={onChange} />
          ) : (
            <CustomPicker
              onChange={onChange}
              openButton={<LanguageName name={current.name} flag={current.flag} />}
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

Language.defaultProps = {
  native: false,
  flat: false,
};

export default Language;
