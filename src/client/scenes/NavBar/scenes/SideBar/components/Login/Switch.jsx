// @flow strict
import * as React from "react";

import Tab from "client/public/components/Tab";
import Text from "client/public/components/Text";
import Flex from "client/primitives/Flex";
import { Consumer as BrandConsumer } from "client/public/services/brand/context";

type Props = {|
  open: "myBooking" | "register" | "signIn",
  onOpenMyBooking: () => void,
  onOpenRegister: () => void,
  onOpenSignIn: () => void,
|};

const Switch = ({ open, onOpenMyBooking, onOpenRegister, onOpenSignIn }: Props) => (
  <Flex>
    <Tab id="myBooking" active={open === "myBooking"} onClick={onOpenMyBooking}>
      <Text t={__("account.oneBookingLogin")} />
    </Tab>
    <BrandConsumer>
      {brand =>
        brand.auth.credentials && (
          <>
            <Tab id="register" active={open === "register"} onClick={onOpenRegister}>
              <Text t={__("account.sign_up")} />
            </Tab>
            <Tab id="signIn" active={open === "signIn"} onClick={onOpenSignIn}>
              <Text t={__("account.sign_in")} />
            </Tab>
          </>
        )
      }
    </BrandConsumer>
  </Flex>
);

export default Switch;
