// @flow strict
import * as React from "react";

type Events = MouseEvent | FocusEvent;

const useOnClickOutside = (ref: React.ElementRef<any>, onClickOutside: (ev: Events) => void) => {
  React.useEffect(() => {
    const handleClickOutside = (ev: Events) => {
      if (!ref.current || (ev.target instanceof Node && ref.current.contains(ev.target))) {
        return;
      }

      onClickOutside(ev);
    };

    document.addEventListener("click", handleClickOutside, true);
    document.addEventListener("focus", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("focus", handleClickOutside, true);
    };
  }, [ref, onClickOutside]);
};

export default useOnClickOutside;
