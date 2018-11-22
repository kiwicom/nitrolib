// @flow strict
// eslint-disable-next-line import/prefer-default-export
export const getLinks = (lang: string) => [
  {
    id: 1,
    title: __("menu.terms_and_conditions"),
    url: `https://www.kiwi.com/${lang}/pages/content/legal/`,
  },
  {
    id: 2,
    title: __("menu.terms_of_use"),
    url: `https://www.kiwi.com/${lang}/pages/content/terms/`,
  },
  {
    id: 3,
    title: __("menu.privacy_policy"),
    url: `https://www.kiwi.com/${lang}/content/privacy/`,
  },
  {
    id: 4,
    title: __("menu.security"),
    url: `https://www.kiwi.com/${lang}/pages/security/`,
  },
];
