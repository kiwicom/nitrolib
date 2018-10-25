// @flow strict
// flowlint untyped-import:off

import * as React from "react";
import { parsePhoneNumber, formatInternational } from "libphonenumber-js";

type Props = {|
  tel: string,
|};

const PhoneNumber = ({ tel }: Props) => <>{parsePhoneNumber(tel).formatInternational()}</>;

export default PhoneNumber;
