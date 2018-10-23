// @flow strict
import * as React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";

import Tab from "../../../../../Tab";
import Text from "../../../../../Text";
import { Consumer as BrandConsumer } from "../../../../../../services/brand/context";

type Props = {|
  open: "myBooking" | "register" | "signIn",
  onOpenMyBooking: () => void,
  onOpenRegister: () => void,
  onOpenSignIn: () => void,
|};

const Switch = ({ open, onOpenMyBooking, onOpenRegister, onOpenSignIn }: Props) => (
  <Stack
    spacing="tight"
    align="even"
    desktop={{ direction: "row", wrap: false, spacing: "extraTight" }}
  >
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
  </Stack>
);

export default Switch;
