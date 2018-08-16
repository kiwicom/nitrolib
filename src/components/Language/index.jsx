// @flow strict
import * as React from "react";
import * as R from "ramda";

import * as intlContext from "../../services/intl/context";
import * as fetchedContext from "../../services/fetched/context";
import NativePicker from "./NativePicker";
import CustomPicker from "./components/CustomPicker";

type Props = {|
  onChange: (lang: string) => void,
  native: boolean,
  flat: boolean,
|};

const Language = ({ onChange, native, flat }: Props) => (
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
              current={current}
              languages={languages}
              continents={fetched.brandLanguage.continents}
              onChange={onChange}
              flat={flat}
            />
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
