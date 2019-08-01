// @flow strict
import { parsePhoneNumber } from "libphonenumber-js/bundle/libphonenumber-max";

type Props = {|
  tel: string,
|};

const PhoneNumber = ({ tel }: Props) => parsePhoneNumber(tel).formatInternational();

export default PhoneNumber;
