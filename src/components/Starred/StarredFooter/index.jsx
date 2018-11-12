// @flow
import * as React from "react";
import styled from "styled-components";

import { Consumer as IntlConsumer } from "../../../services/intl/context";
import Translate from "../../Translate";
import ButtonLink from "../../NavBar/primitives/ButtonLink";

const WrapperFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StarredFooter = () => (
  <WrapperFooter>
    <IntlConsumer>
      {intl => (
        <ButtonLink
          color="primary"
          fontSize={14}
          href={`/${intl.language.id}/content/account/starred`}
        >
          <Translate t={__("common.view_all")} />
        </ButtonLink>
      )}
    </IntlConsumer>
  </WrapperFooter>
);

export default StarredFooter;
