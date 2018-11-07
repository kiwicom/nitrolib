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
import type { Modal as ModalType } from "../../consts/modals";

type Props = {|
  native: boolean,
  positionMenuDesktop?: number,
  positionMenuTablet?: number,
  flat: boolean,
  favorite?: LanguageType[],
  hideNativeText?: boolean,
  onChange: (lang: string) => void,
  onSetModal?: (modal: ModalType) => void,
|};

const Language = ({
  onChange,
  hideNativeText,
  native,
  flat,
  positionMenuDesktop,
  positionMenuTablet,
  favorite,
  onSetModal,
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

          // TODO no sorting in components! add to 'fetched' or whatever
          // eslint-disable-next-line fp/no-mutating-methods
          const languages = R.sort((a, b) => a.name.localeCompare(b.name), R.values(languageMap));

          return native ? (
            <NativePicker
              current={current}
              languages={languages}
              favorite={favorite}
              hideNativeText={hideNativeText}
              onChange={onChange}
            />
          ) : (
            <CustomPicker openButton={<LanguageCurrent language={current} />} onChange={onChange}>
              {render => (
                <Menu
                  currentId={intl.language.id}
                  onChange={render.onChange}
                  languages={languages}
                  continents={fetched.brandLanguage.continents}
                  positionMenuDesktop={positionMenuDesktop || 0}
                  positionMenuTablet={positionMenuTablet || 0}
                  flat={flat}
                  onSetModal={onSetModal}
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
