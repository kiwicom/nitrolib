# LocationPicker

- Supports main and holidays gql location api.
- By default uses allLocations query [voyager](https://kiwi-graphql-voyager.now.sh/).
- To fetch specific location type allLocations has paramater called option, which is sent via locationType prop.

**Example:**

```js
import LocationPicker from "@kiwicom/nitro/lib/components/LocationPicker";
import Translate from "@kiwicom/nitro/lib/components/Translate";

<LocationPicker
  value={from}
  onChange={setSomething()}
  label={<Translate t="search.from" />}
/>;
```

**_with options_**

```js
<LocationPicker
  value={from}
  onChange={setSomething()}
  // option
  locationType="airport"
  label={<Translate t="search.from" />}
/>
```

**_holidays_**

```js
<LocationPicker
  value={from}
  onChange={setSomething()}
  // option
  queryName="holidaysLocations"
  label={<Translate t="search.from" />}
/>
```
