// @flow strict
import * as React from "react";
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink";
import useOnClickOutside from "@kiwicom/orbit-components/lib/hooks/useClickOutside";

type Arg = {|
  onChange: (input: string) => void,
|};

type Props = {|
  text: React.Node,
  iconLeft?: React.Node,
  dataTest: string,
  onChange: (input: string) => void,
  children: (arg: Arg) => React.Node,
|};

const CustomPicker = ({ text, onChange, children, dataTest, iconLeft }: Props) => {
  const node = React.useRef(null);
  const [isOpen, setOpen] = React.useState(false);

  useOnClickOutside(node, () => setOpen(false));

  return (
    <div ref={node}>
      <ButtonLink
        dataTest={dataTest}
        iconLeft={iconLeft}
        transparent
        type="secondary"
        onClick={() => setOpen(true)}
      >
        {text}
      </ButtonLink>
      {isOpen &&
        children({
          onChange: (input: string) => {
            onChange(input);
            setOpen(false);
          },
        })}
    </div>
  );
};

export default CustomPicker;
