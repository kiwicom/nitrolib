// @flow strict
import type { LangInfo } from "../../../records/LangInfo";

// cars.kiwi.com are powered by rentalcars.com
const getCarsLanguage = (isoShort: string) => (isoShort === "el" ? "gr" : isoShort); // "fix" greek language code

export default function getLink(language: LangInfo) {
  return `https://cars.kiwi.com/?preflang=${getCarsLanguage(
    language.iso.substring(0, 2),
  )}&adplat=headerlinks`;
}
