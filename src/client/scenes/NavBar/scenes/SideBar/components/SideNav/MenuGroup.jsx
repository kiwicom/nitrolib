// @flow strict
import * as React from "react";
import type { Node } from "react";

import Text from "client/components/Text";

type Props = {
  headerText?: ?string,
  children: Node,
};

const MenuGroup = ({ headerText, children }: Props) => (
  <>
    <div itemScope itemType="http://www.schema.org/SiteNavigationElement">
      {headerText !== undefined &&
        headerText !== null && (
          <span>
            <Text t={headerText} />
          </span>
        )}
      {children}
    </div>
  </>
);

export default MenuGroup;
