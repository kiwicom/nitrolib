# Services

Located in `@kiwicom/nitro/lib/services/<service>`.

**Context:**

* [auth](#auth)
* [brand](#brand)
* [currency](#currency)
* [fetched](#fetched)
* [intl](#intl)
* [inverted](#inverted)
* [log](#log)

## Contexts

Services that export a _React_ context.

### Auth

**Import:**
```js
import auth from "@kiwicom/nitro/lib/services/auth/context.js";
```

_TODO_

### Brand

**Import:**
```js
import brand from "@kiwicom/nitro/lib/services/brand/context.js";
```

_TODO_

### Currency

**Import:**
```js
import currency from "@kiwicom/nitro/lib/services/currency/context.js";
```

_TODO_

### Fetched

**Import:**
```js
import fetched from "@kiwicom/nitro/lib/services/fetched/context.js";
```

_TODO_

### Intl

**Import:**
```js
import intl from "@kiwicom/nitro/lib/services/intl/context.js";
```

Contains all necessary information regarding **i18n**:
* **language info** - a record from the `data/languages.json` file, see `records/LangInfo.js` for the type and default value
* **translations** - one of the files from `data/translations/<locale>_<hash>.json`, a key/value object
* **translate function** - read below

### Inverted

**Import:**
```js
import inverted from "@kiwicom/nitro/lib/services/inverted/context.js";
```

_TODO_

### Log

**Import:**
```js
import log from "@kiwicom/nitro/lib/services/log/context.js";
```

_TODO_
