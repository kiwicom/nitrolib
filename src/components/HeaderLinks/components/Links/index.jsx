// @flow strict
import * as React from "react";

import Link from "../Link/index";
import Text from "../../../Text/index";

export type Param = {|
  key: string,
  prop?: string,
  value?: string,
|};

export type Item = {|
  id: string,
  translation: string,
  newWindow: boolean,
  url: string,
|};

type Props = {|
  services: Item[],
|};

const Links: Props => React.Node = ({ services }) =>
  services.map(
    item =>
      item && (
        <Link
          logTab={item.id}
          link={item.url}
          text={<Text t={item.translation} />}
          newWindow={item.newWindow}
        />
      ),
  );

export default Links;
