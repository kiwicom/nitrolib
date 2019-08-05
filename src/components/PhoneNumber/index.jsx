// @flow strict
import { parsePhoneNumber } from "libphonenumber-js";

type Props = {|
  tel: string,
|};

const PhoneNumber = ({ tel }: Props) => parsePhoneNumber(tel).formatInternational();

export default PhoneNumber;
