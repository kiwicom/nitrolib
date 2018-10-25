// @flow strict
import * as React from "react";

import Translate from "../Translate";
import Link from "./Link";
import { parseUrl } from "./helpers/parseUrl";
import type { ParseUrl } from "./helpers/parseUrl";

export type Item = {|
  id: string,
  image?: string,
  translation: string,
  provider: string,
  isoShort?: boolean,
  isoCars?: boolean,
  supportedLanguages?: string[],
  params: Object[],
  url: {
    default: string,
  },
|};

type Props = {|
  services: {
    items: Item[],
  },
  searchParams: {
    currency: string,
    language: string,
    adultsCount: number,
    childrenCount: number,
    aid: boolean,
  },
  urlParam: string,
|};

const Links = ({ services, searchParams, urlParam }: Props) =>
  services.items.map(item => (
    <Link
      logTab={item.id}
      link={parseUrl(
        ({
          item,
          searchParams,
          urlParam,
        }: ParseUrl),
      )}
      icon={<img src={item.image} alt="" />}
      text={<Text t={item.translation} />}
    />
  ));

export default Links;
