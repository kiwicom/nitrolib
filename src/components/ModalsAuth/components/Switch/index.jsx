// @flow strict
import * as React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";

import Tab from "../../../Tab/index";
import Translate from "../../../Translate/index";
import { Consumer as BrandConsumer } from "../../../../services/brand/context";
import * as MODALS from "../../../../consts/modals";

type Props = {|
  value: string,
  onChange: (value: string) => void,
|};

const Switch = ({ value, onChange }: Props) => (
  <Stack flex direction="column" spacing="none" mediumMobile={{ direction: "row" }}>
    <Tab id={MODALS.MY_BOOKING} active={value === MODALS.MY_BOOKING} onClick={onChange}>
      <Translate t="account.oneBookingLogin" />
    </Tab>
    <BrandConsumer>
      {brand =>
        brand.auth.credentials && (
          <>
            <Tab id={MODALS.REGISTER} active={value === MODALS.REGISTER} onClick={onChange}>
              <Translate t="account.sign_up" />
            </Tab>
            <Tab id={MODALS.SIGN_IN} active={value === MODALS.SIGN_IN} onClick={onChange}>
              <Translate t="account.sign_in" />
            </Tab>
          </>
        )
      }
    </BrandConsumer>
  </Stack>
);

export default Switch;
