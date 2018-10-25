// @flow strict
// flowlint untyped-import:off

import * as React from "react";
import { parsePhoneNumber, formatInternational } from "libphonenumber-js";

type Props = {|
  tel: string,
|};

const PhoneNumber = ({ tel }: Props) => (
  <React.Fragment>{parsePhoneNumber(tel).formatInternational()}</React.Fragment>
);

export default PhoneNumber;
