// @flow strict

import * as React from "react";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import ModalHeader from "@kiwicom/orbit-components/lib/Modal/ModalHeader";

import { useBrand } from "../../../../services/brand/context";
import { useIntl } from "../../../../services/intl/context";

const ILLUSTRATION = {
  help: "Help",
  refer: "ReferAFriend",
  mmb: "Login",
};

const TITLE_TKEY = {
  help: __("account.login_title.get_help"),
  refer: __("account.login_title.refer"),
  mmb: __("account.manage_your_bookings"),
};

const DESC_TKEY = {
  help: __("account.login_description.help"),
  refer: __("account.login_description.refer"),
  mmb: __("account.sign_in_description"),
};

export type LoginType = "mmb" | "help" | "refer";

type Props = {|
  type: LoginType,
|};

const TailoredHeader = ({ type }: Props) => {
  const intl = useIntl();
  const brand = useBrand();

  return (
    <ModalHeader
      title={intl.translate(TITLE_TKEY[type])}
      description={intl.translate(DESC_TKEY[type], { brandName: brand.name })}
      illustration={<Illustration name={ILLUSTRATION[type]} size="small" />}
    />
  );
};

export default TailoredHeader;
