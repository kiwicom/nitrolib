// @flow strict
import * as React from "react";

import Link from "../Link";
import Translate from "../../../Translate";
import type { HeaderLink } from "../../records/HeaderLink";

type Props = {|
  services: HeaderLink[],
  active?: string,
  inverted?: boolean,
|};

const Links = ({ inverted, services, active }: Props): React.Node[] =>
  services.map(item => (
    <Link
      key={item.id}
      link={item.url}
      icon={item.id}
      text={<Translate t={item.translation} />}
      inverted={inverted}
      active={item.id === active}
      newWindow={item.newWindow}
    />
  ));

export default Links;
