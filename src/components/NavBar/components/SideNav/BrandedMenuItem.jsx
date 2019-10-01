// @flow strict
import * as React from "react";

import Translate from "../../../Translate";
import MenuItem from "./MenuItem";

type Props = {|
  title: string,
  link?: string,
|};

const BrandedMenuItem = ({ title, link }: Props) => (
  <MenuItem
    link={link}
    text={
      <Translate
        t={title}
        values={{
          companyName: "Kiwi.com",
        }}
      />
    }
  />
);

export default BrandedMenuItem;
