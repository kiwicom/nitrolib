// @flow strict
import type { LangInfo } from "../../../records/LangInfo";

export default function getLink(language: LangInfo) {
  return `https://www.kiwi.com/${language.id}/searchDeep?pageName=search`;
}
