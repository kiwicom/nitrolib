// @flow strict
import * as React from "react";

import Text from "components/Text";
import MenuItem from "./MenuItem";

type Props = {|
  title: string,
  Icon: React.ComponentType<{ className: string }>,
  link?: string,
|};

const BrandedMenuItem = ({ title, Icon, link }: Props) => (
  <MenuItem
    link={link}
    Icon={Icon}
    text={
      <Text
        t={title}
        values={{
          companyName: "Kiwi.com",
        }}
      />
    }
  />
);

export default BrandedMenuItem;
