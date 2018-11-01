// @flow strict
import type { LangInfo } from "../../../records/LangInfo";

export default function getLink(language: LangInfo) {
  return `/${language.id}/searchDeep?pageName=search`;
}
