// @flow strict
import * as React from "react";

const useKey = (target: string) => {
  const [pressed, set] = React.useState(false);

  const handleDown = ({ key }: SyntheticKeyboardEvent<>) => {
    if (key === target) {
      set(true);
    }
  };

  const handleUp = ({ key }: SyntheticKeyboardEvent<>) => {
    if (key === target) {
      set(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleDown);
    window.addEventListener("keyup", handleUp);

    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keyup", handleUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return pressed;
};

export default useKey;
