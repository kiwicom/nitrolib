// @flow strict
/**
 * For some translations it's difficult to have them statically analysable in a source code.
 * It's either because of the app's design, or because of the legacy reasons.
 * They're listed here so that they can be picked up by a parser.
 */
// eslint-disable-next-line no-unused-vars
const MANUALLY_ADDED_TRANSLATIONS = [
  __("content.cookies.kayakwhite"),
  __("content.cookies.kiwicom"),
  __("content.cookies.paragraphs"),
  // __("content.legal.terms_kayakwhite"),
  // __("content.legal.terms_kiwicom_nov17"),
  // __("content.legal.terms_kayakwhite_us"),
  // __("content.privacy.kayakwhite"),
  // __("content.privacy.kiwicom"),
  // __("seo.from.url"),
  // __("seo.to.url"),
  // __("seo.url.anytime"),
  // __("seo.url.anywhere"),
  // __("seo.url.days"),
  // __("seo.url.departure"),
  // __("seo.url.direct"),
  // __("seo.url.no-return"),
  // __("seo.url.return"),
];
