// @flow strict
import * as React from "react";

import Link from "../Link";
import Text from "../../../Text";
import type { HeaderLink } from "../../records/HeaderLink";

type Props = {|
  services: HeaderLink[],
|};

const Links: Props => React.Node = ({ services }) =>
  services.map(
    item =>
      item && (
        <Link
          logTab={item.id}
          link={item.url}
          icon={item.id}
          text={<Text t={item.translation} />}
          newWindow={item.newWindow}
        />
      ),
  );

export default Links;
