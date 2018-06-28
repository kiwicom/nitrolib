// @flow strict
import { language as languageConsts } from "client/styles/index";
import type { Language } from "client/public/records/Languages";

const getWidthConstant = (filteredLanguages: Language[]) =>
  filteredLanguages.length < languageConsts.limit ? 2 : 3; // 2 || 3 columns

export const getLanguageWrapperHeight = (filteredLanguages: Language[]) => {
  const widthConstant = getWidthConstant(filteredLanguages);

  // For filtered cases - enables to wrap to (2 || 3) cols every time
  const heightConstraint =
    Math.ceil(filteredLanguages.length / widthConstant) * languageConsts.row.height; // custom height depends on number of columns
  return filteredLanguages.length <= languageConsts.limit // && this.props.isMobile
    ? filteredLanguages.length * languageConsts.row.height // custom height depends on number of languages, only on mobile && when less languages than limit
    : heightConstraint;
};

export const getLanguageWrapperWidth = (filteredLanguages: Language[]) =>
  getWidthConstant(filteredLanguages) * languageConsts.row.width;
