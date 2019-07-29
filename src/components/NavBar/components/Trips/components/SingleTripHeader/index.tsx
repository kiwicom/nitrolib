
import * as React from "react";

import ButtonLink from "../../../../primitives/ButtonLink";
import Translate from "../../../../../Translate";
import { Consumer as IntlConsumer } from "../../../../../../services/intl/context";

const SingleTripHeader = () => (
  <IntlConsumer>
    {intl => (
      <>
        <ButtonLink
          marginLeft={20}
          bold
          href={`/${intl.language.id}/account#future`}
          color="secondary"
        >
          <Translate t="account.upcoming_trips" values={{ trips: 1 }} />
        </ButtonLink>
        <ButtonLink
          marginRight={20}
          color="primary"
          bold
          href={`/${intl.language.id}/account#past`}
        >
          <Translate t="account.past_trips" />
        </ButtonLink>
      </>
    )}
  </IntlConsumer>
);

export default SingleTripHeader;
