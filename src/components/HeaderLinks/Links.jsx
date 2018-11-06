// @flow strict
import * as React from "react";

import Text from "../Text";
import Link from "./Link";
import { parseUrl } from "./helpers/parseUrl";
import type { ReadyUrl, HiddenUrls } from "./index";

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
  params?: Object[],
  url?: {
    default: string,
  },
|};

type Props = {|
  services: {
    items: Item[],
  },
  searchParams: {
    language: string,
  },
  urlParam: string,
  readyUrls: ReadyUrl,
  hiddenUrls: HiddenUrls,
|};

const Links = ({ services, searchParams, urlParam, readyUrls, hiddenUrls }: Props) =>
  services.items.map(item => {
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
        icon={<img src={item.image} alt="" />}
        text={<Text t={item.translation} />}
        newWindow={item.newWindow}
      />
    );
  });

export default Links;
