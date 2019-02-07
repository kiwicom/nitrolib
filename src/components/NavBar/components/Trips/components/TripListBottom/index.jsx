// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";

import ItemWrapper from "../../primitives/ItemWrapper";
import Translate from "../../../../../Translate";
import { Consumer as IntlConsumer } from "../../../../../../services/intl/context";
import ButtonLink from "../../../../primitives/ButtonLink";
import Flex from "../../../../../../primitives/Flex";

type Props = {|
  children: React.Node,
|};

const TripsBottomWrapper = styled.div`
  display: flex;
  width: 120px;
  ${mq.mediumMobile(css`
    width: 180px;
  `)};
`;

const TripListBottom = ({ children }: Props) => (
  <IntlConsumer>
    {intl => (
      <>
        <ItemWrapper>
          <TripsBottomWrapper>{children}</TripsBottomWrapper>
          <Flex y="center">
            <ButtonLink
              color="primary"
              marginLeft={25}
              bold
              href={`/${intl.language.id}/account#future`}
            >
              <Translate t="account.all_trips" />
            </ButtonLink>
          </Flex>
        </ItemWrapper>
      </>
    )}
  </IntlConsumer>
);

export default TripListBottom;
