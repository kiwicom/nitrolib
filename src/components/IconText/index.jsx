// @flow strict
import * as React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Text from "@kiwicom/orbit-components/lib/Text";

type Props = {|
  icon: React.Node,
  children: React.Node,
|};

const IconText = ({ icon, children }: Props) => (
  <Stack flex align="center" spacing="condensed">
    {icon}
    <Text>{children}</Text>
  </Stack>
);

export default IconText;
