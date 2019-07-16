// @flow strict
import * as React from "react";

const useEventListener = <N, F>(event: N, fn: F, element: typeof window = window) => {
  const ref: { current: any } = React.useRef();

  React.useEffect(() => {
    ref.current = fn;
  }, [fn]);

  React.useEffect(() => {
    if (!element && !element.addEventListener) return undefined;

    const eventListener = <L>(ev: L) => ref.current(ev);

    element.addEventListener(event, eventListener);

    return () => {
      element.removeEventListener(event, eventListener);
    };
  }, [element, event]);
};

export default useEventListener;
