// @flow strict
import * as React from "react";

import Link from "../Link";
import Translate from "../../../Translate";
import type { HeaderLink, ActiveTab } from "../../records/HeaderLink";

type Props = {|
  activeTab: ActiveTab,
  services: HeaderLink[],
  inverted?: boolean,
|};

const Links = ({ inverted, services, activeTab }: Props): React.Node[] =>
  services.map(item => (
    <Link
      key={item.id}
      link={item.url}
      icon={item.id}
      text={<Translate t={item.translation} />}
      inverted={inverted}
      active={item.id === activeTab}
      newWindow={item.newWindow}
    />
  ));

export default Links;
