// @flow strict
import * as React from "react";

import { call } from "../../services/input/phoneValidator";

type Props = {|
  tel: string,
|};

const PhoneNumber = ({ tel }: Props) => {
  const [number, setNumber] = React.useState("");

  React.useEffect(() => {
    call(tel).then(res => setNumber(res.formatInternational));
  });

  return <div>{number}</div>;
};

export default PhoneNumber;
