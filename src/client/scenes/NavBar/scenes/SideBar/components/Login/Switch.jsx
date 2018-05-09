// @flow strict
import * as React from "react";

import Tab from "client/components/Tab";
import Text from "client/components/Text";
import Flex from "client/primitives/Flex";
import { Consumer as BrandConsumer } from "client/services/brand/context";

type Props = {|
  open: "myBooking" | "register" | "signIn",
  onOpenMyBooking: () => void,
  onOpenRegister: () => void,
  onOpenSignIn: () => void,
|};

const Switch = (props: Props) => (
  <Flex>
    <BrandConsumer>
      {brand =>
        brand.auth.credentials && (
          <>
            <Tab id="register" active={props.open === "register"} onClick={props.onOpenRegister}>
              <Text t={__("account.sign_up")} />
            </Tab>
            <Tab id="signIn" active={props.open === "signIn"} onClick={props.onOpenSignIn}>
              <Text t={__("account.sign_in")} />
            </Tab>
          </>
        )
      }
    </BrandConsumer>
    <Tab id="myBooking" active={props.open === "myBooking"} onClick={props.onOpenMyBooking}>
      <Text t={__("account.oneBookingLogin")} />
    </Tab>
  </Flex>
);

export default Switch;
