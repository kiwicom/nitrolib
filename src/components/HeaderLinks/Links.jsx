// @flow strict
import * as React from "react";

import Text from "../Text";
import Link from "./Link";
import { parseUrl } from "./helpers/parseUrl";
import type { ParseUrl } from "./helpers/parseUrl";

type Item = {|
  id: string,
  image: string,
  translation: string,
  url: string,
|};

type Props = {|
  services: {
    items: Item[],
  },
  currency: string,
  language: string,
  adultsCount: number,
  childrenCount: number,
  aid: boolean,
|};

const Links = ({ services, currency, language, adultsCount, childrenCount, aid }: Props) =>
  services.items.map(item => {
    const link = parseUrl(
      ({
        link: item.url,
        currency,
        language,
        adultsCount,
        childrenCount,
        aid,
      }: ParseUrl),
    );

    return (
      <Link
        logTab={item.id}
        link={link}
        // newWindow={forceNewWindow}
        icon={<img src={item.image} alt="" />}
        text={<Text t={item.translation} />}
      />
    );
  });

export default Links;
