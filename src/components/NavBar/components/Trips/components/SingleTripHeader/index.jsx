// @flow
import * as React from "react";
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink";

import Translate from "../../../../../Translate";
import { Consumer as IntlConsumer } from "../../../../../../services/intl/context";

const SingleTripHeader = () => (
  <IntlConsumer>
    {intl => (
      <>
        <ButtonLink href={`/${intl.language.id}/account#future`} type="secondary">
          <Translate t="account.upcoming_trips" values={{ trips: 1 }} />
        </ButtonLink>
        <ButtonLink type="primary" href={`/${intl.language.id}/account#past`}>
          <Translate t="account.past_trips" />
        </ButtonLink>
      </>
    )}
  </IntlConsumer>
);

export default SingleTripHeader;
