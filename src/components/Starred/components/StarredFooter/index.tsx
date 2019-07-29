import * as React from "react";
import styled from "styled-components";

import { Consumer as IntlConsumer } from "../../../../services/intl/context";
import Translate from "../../../Translate";
import ButtonLink from "../../../NavBar/primitives/ButtonLink";

const Wrapper = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StarredFooter = () => (
  <IntlConsumer>
    {intl => (
      <Wrapper>
        <ButtonLink
          color="primary"
          fontSize={14}
          href={`/${intl.language.id}/content/account/starred`}
        >
          <Translate t="common.view_all" />
        </ButtonLink>
      </Wrapper>
    )}
  </IntlConsumer>
);

export default StarredFooter;
