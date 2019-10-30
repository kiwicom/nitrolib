**Store** contains all FE's needed server data. It loads everything for the server's runtime and has it available in the exported `data` object.

> Be sure to run `yarn nitro fetch` and `yarn nitro translations` to have the data ready!

The `load` function returns a promise, which resolves once all data is loaded and can be accessed by the runtime.

**Example:**
```js
import { load } from "@kiwicom/nitro/lib/services/server/load";

// ...

load(options).then(() => {
  app.use(/* ...*/);

  app.listen(/* ...*/);
});
```
