// @flow strict
import * as React from "react";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";

import ItemWrapper from "../../primitives/ItemWrapper";
import Text from "../../../../../Text";
import { Consumer as IntlConsumer } from "../../../../../../services/intl/context";

type Props = {|
  children: React.Node,
|};

const TripListBottom = ({ children }: Props) => (
  <IntlConsumer>
    {intl => (
      <>
        <ItemWrapper>
          {children}
          <TextLink type="primary" href={`/${intl.language.id}/account#future`}>
            <Text t={__("account.all_trips")} />
          </TextLink>
        </ItemWrapper>
      </>
    )}
  </IntlConsumer>
);

export default TripListBottom;
