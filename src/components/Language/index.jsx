// @flow strict
import * as React from "react";
import * as R from "ramda";

import * as intlContext from "../../services/intl/context";
import * as fetchedContext from "../../services/fetched/context";
import NativePicker from "./NativePicker";
import CustomPicker from "../CustomPicker";
import LanguageCurrent from "./components/LanguageCurrent";
import Menu from "./components/Menu";
import type { Language as LanguageType } from "../../records/Languages";

type Props = {|
  native: boolean,
  positionMenuDesktop?: number,
  positionMenuTablet?: number,
  flat: boolean,
  favorite?: LanguageType[],
  onChange: (lang: string) => void,
|};

const Language = ({
  onChange,
  native,
  flat,
  positionMenuDesktop,
  positionMenuTablet,
  favorite,
}: Props) => (
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
            />
          ) : (
            <CustomPicker openButton={<LanguageCurrent language={current} />} onChange={onChange}>
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
