import * as React from "react";

import Translate from "../../../Translate";
import MenuItem from "./MenuItem";

type Props = {
  title: string,
  Icon: React.ComponentType<{ className: string }>,
  link?: string,
};

const BrandedMenuItem = ({ title, Icon, link }: Props) => (
  <MenuItem
    link={link}
    Icon={Icon}
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
