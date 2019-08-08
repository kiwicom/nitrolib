// @flow strict
import * as React from "react";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink";
import Button from "@kiwicom/orbit-components/lib/Button";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import FacebookIcon from "@kiwicom/orbit-components/lib/icons/Facebook";
import GoogleIcon from "@kiwicom/orbit-components/lib/icons/Google";
import ChevronLeft from "@kiwicom/orbit-components/lib/icons/ChevronLeft";
import Modal, { ModalHeader, ModalSection } from "@kiwicom/orbit-components/lib/Modal";
import Stack from "@kiwicom/orbit-components/lib/Stack";

import Translate from "../../../../Translate";
import Text from "../../../../Text";
import { useBrand } from "../../../../../services/brand/context";

type Props = {|
  onBack: (SyntheticEvent<HTMLButtonElement>) => void,
  onRegister: (ev: SyntheticEvent<HTMLButtonElement>) => void,
  onFacebookLogin: (ev: SyntheticEvent<HTMLButtonElement>) => void,
  onGoogleLogin: (ev: SyntheticEvent<HTMLButtonElement>) => void,
|};

const NoAccount = ({ onBack, onRegister, onFacebookLogin, onGoogleLogin }: Props) => {
  const brand = useBrand();

  return (
    <Modal>
      <ModalHeader
        illustration={<Illustration name="NoResults" size="small" />}
        title={
          <Heading element="h2">
            <Translate t="account.no_bookings_or_account" />
          </Heading>
        }
        description={
          <Text t="account.no_bookings_or_account_description" values={{ brandName: brand.name }} />
        }
      />
      <ModalSection dataTest="MagicLogin-NoAccount">
        <Stack spacing="natural" direction="column">
          <Button onClick={onRegister}>
            <Translate t="account.register" />
          </Button>
          <ButtonLink type="secondary" iconLeft={<ChevronLeft />} onClick={onBack}>
            <Translate t="account.back" />
          </ButtonLink>
        </Stack>
      </ModalSection>
      <ModalSection suppressed>
        <Text t="account.or_social_account" weight="bold" spaceAfter="medium" />
        <Stack spacing="natural" flex>
          <Button type="facebook" block bordered icon={<FacebookIcon />} onClick={onFacebookLogin}>
            <Translate t="account.log_in_with" values={{ provider: "Facebook" }} />
          </Button>
          <Button type="google" block bordered icon={<GoogleIcon />} onClick={onGoogleLogin}>
            <Translate t="account.log_in_with" values={{ provider: "Google" }} />
          </Button>
        </Stack>
      </ModalSection>
    </Modal>
  );
};

export default NoAccount;
