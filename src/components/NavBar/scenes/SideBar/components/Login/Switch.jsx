// @flow strict
import * as React from "react";

import Tab from "components/Tab";
import Text from "components/Text";
import { Consumer as BrandConsumer } from "services/brand/context";
import Flex from "primitives/Flex";

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
