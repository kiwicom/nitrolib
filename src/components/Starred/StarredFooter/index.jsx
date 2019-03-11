// @flow strict
import * as React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";

import { Consumer as IntlConsumer } from "../../../services/intl/context";
import Translate from "../../Translate";
import ButtonLink from "../../NavBar/primitives/ButtonLink";

const StarredFooter = () => (
  <Stack flex inline justify="center">
    <IntlConsumer>
      {intl => (
        <ButtonLink
          color="primary"
          fontSize={14}
          href={`/${intl.language.id}/content/account/starred`}
        >
          <Translate t="common.view_all" />
        </ButtonLink>
      )}
    </IntlConsumer>
  </Stack>
);

export default StarredFooter;
