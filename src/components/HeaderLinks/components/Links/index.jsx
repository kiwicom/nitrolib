// @flow strict
import * as React from "react";

import Link from "../Link";
import Translate from "../../../Translate";
import type { HeaderLink } from "../../records/HeaderLink";

type Props = {|
  inverted: boolean,
  services: HeaderLink[],
|};

const Links = ({ inverted, services }: Props): React.Node[] =>
  services.map(item => (
    <Link
      key={item.id}
      link={item.url}
      icon={item.id}
      text={<Translate t={item.translation} />}
      inverted={inverted}
      active={item.active}
      newWindow={item.newWindow}
    />
  ));

export default Links;
