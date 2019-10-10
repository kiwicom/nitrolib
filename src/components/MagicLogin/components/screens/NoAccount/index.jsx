// @flow strict
import * as React from "react";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import ChevronLeft from "@kiwicom/orbit-components/lib/icons/ChevronLeft";
import ModalHeader from "@kiwicom/orbit-components/lib/Modal/ModalHeader";
import ModalSection from "@kiwicom/orbit-components/lib/Modal/ModalSection";
import Stack from "@kiwicom/orbit-components/lib/Stack";

import Button from "../../../../Button";
import { useBrand } from "../../../../../services/brand/context";
import { useIntl } from "../../../../../services/intl/context";
import LoginViaSocials from "../../LoginViaSocials";

type Props = {|
  onBack: (SyntheticEvent<HTMLButtonElement>) => void,
  onRegister: (ev: SyntheticEvent<HTMLButtonElement>) => void,
  onFacebookLogin: (ev: SyntheticEvent<HTMLButtonElement>) => void,
  onGoogleLogin: (ev: SyntheticEvent<HTMLButtonElement>) => void,
|};

const NoAccount = ({ onBack, onRegister, onFacebookLogin, onGoogleLogin }: Props) => {
  const brand = useBrand();
  const intl = useIntl();

  return (
    <>
      <ModalHeader
        title={intl.translate(__("account.no_bookings_or_account"))}
        description={intl.translate(__("account.no_bookings_or_account_description"), {
          brandName: brand.name,
        })}
        illustration={<Illustration name="NoResults" size="small" />}
      />
      <ModalSection dataTest="MagicLogin-NoAccount">
        <Stack spacing="natural" direction="column">
          <Button t="account.register" onClick={onRegister} />
          <Button
            t="account.back"
            type="secondary"
            iconLeft={<ChevronLeft />}
            onClick={onBack}
            dataTest="MagicLogin-NoAccountBack"
          />
        </Stack>
      </ModalSection>
      <LoginViaSocials onGoogleLogin={onGoogleLogin} onFacebookLogin={onFacebookLogin} />
    </>
  );
};

export default NoAccount;
