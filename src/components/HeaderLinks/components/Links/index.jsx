// @flow strict
import * as React from "react";

import Link from "../Link";
import Text from "../../../Text";

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
  services.map(item => (
    <Link
      logTab={item.id}
      link={item.url}
      text={<Text t={item.translation} />}
      icon={item.id}
      newWindow={item.newWindow}
    />
  ));

export default Links;
