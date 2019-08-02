#useEventListener

`import useEventListener from "@kiwicom/nitro/lib/services/hooks/useEventListener"`

***Usage***
  ```js
  const App = () => {
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });

  const handler = React.useCallback(
    ({ clientX, clientY }) => {
      setCoords({ x: clientX, y: clientY });
    },
    [setCoords],
  );

  // Add event listener using our hook
  useEventListener("mousemove", handler);

  return (
    <div>
      {coords.x}, {coords.y}
    </div>
  );
};
