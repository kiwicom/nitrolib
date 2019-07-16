# useOnClickOutside

  `import useOnClickOutside from @kiwicom/nitro/lib/services/hooks/useOnClickOutside`

 - hook to handle `onClickOutside` click and focus events

***Usage***

  ```js
  const Component = () => {
    const ref = React.useRef();

    const [isOpen, setOpen] = React.useState(true);

    useOnClickOutside(ref, () => setOpen(false));

    return (
      <>
        {isOpen ? (
          <div ref={ref}>Click Outside</div>
        ) : (
          <button type="button" onClick={() => setOpen(true)}>
            Open Modal
          </button>
        )}
      </>
    );
  };

