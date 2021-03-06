// @flow strict
import * as React from "react";

import Link from "../Link";
import Translate from "../../../Translate";
import type { HeaderLink } from "../../records/HeaderLink";

type Props = {|
  services: HeaderLink[],
  active?: string,
  inverted?: boolean,
  newDesign?: boolean,
|};

const Links = ({ inverted, services, active, newDesign }: Props): React.Node[] =>
  services.map(item => (
    <Link
      key={item.id}
      link={item.url}
      icon={item.id}
      text={<Translate t={item.translation} values={{ companyName: "Kiwi.com" }} />}
      inverted={inverted}
      newDesign={newDesign}
      active={item.id === active}
      newWindow={item.newWindow}
    />
  ));

export default Links;
