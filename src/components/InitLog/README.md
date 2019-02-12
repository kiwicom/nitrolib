# InitLog

Initializes the [log](./services#log) context.

**Example:**
```js
import type { EventPayload } from "@kiwicom/nitro/lib/records/Event";
import type { Globals } from "@kiwicom/nitro/lib/records/Loglady";
import { Provider as LogProvider } from "@kiwicom/nitro/lib/services/log/context";
import InitLog from "@kiwicom/nitro/lib/components/InitLog";

const globals: Globals = {
  userId: window.__SESSION__.USER_ID,
  langId: window.__INTL__.id,
  // ...etc
};

function log(ev: EventPayload, globals: Globals) {
  // do side effects
}

ReactDOM.render(
  <InitLog globals={globals} onLog={log}>
    {ctx => (
      <LogProvider value={ctx}>
        <App />
      </LogProvider>
    )}
  </InitLog>,
  node,
);
```
