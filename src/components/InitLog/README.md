# InitLog

Initializes the [log](./services#log) context.

Logs are logged using the [log/logger](./services#logger) service.

**Example:**
```js
import { Provider as LogProvider } from "@kiwicom/nitro/lib/services/log/context";
import InitLog from "@kiwicom/nitro/lib/components/InitLog";
import * as logger from "@kiwicom/nitro/lib/services/log/logger";

logger.globals.userId = window.__SESSION__.userId;
logger.globals.langId = window.__INTL__.id;
// ...

ReactDOM.render(
  <InitLog>
    {ctx => (
      <LogProvider value={ctx}>
        <App />
      </LogProvider>
    )}
  </InitLog>,
  node,
);
```
