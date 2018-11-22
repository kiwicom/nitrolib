// @flow strict
import * as React from "react";

import Link from "../Link/index";
import Text from "../../../Text/index";
import { parseUrl } from "../../helpers/parseUrl";
import type { ReadyUrl, HiddenUrls } from "../../index";

export type Param = {|
  key: string,
  prop?: string,
  value?: string,
|};

export type Item = {|
  id: string,
  image?: string,
  translation: string,
  provider: string,
  isoShort?: boolean,
  isoCars?: boolean,
  supportedLanguages?: string[],
  feLink?: boolean,
  newWindow: boolean,
  params: Param[],
  url?: {
    default: string,
  },
|};

type Props = {|
  services: Item[],
  searchParams: {
    language: string,
  },
  urlParam: string,
  readyUrls: ReadyUrl,
  hiddenUrls: HiddenUrls,
|};

const Links: Props => React.Node = ({ services, searchParams, urlParam, readyUrls, hiddenUrls }) =>
  services.map(item => {
    const link = parseUrl({
      item,
      searchParams,
      urlParam,
      readyUrls,
      hiddenUrls,
    });

    if (!link) return null;

    return (
      <Link
        logTab={item.id}
        link={link}
        text={<Text t={item.translation} />}
        newWindow={item.newWindow}
      />
    );
  });

export default Links;
