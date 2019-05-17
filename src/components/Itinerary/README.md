# Itinerary

- Renders all trip types aka Itineraries (oneWay, return, multicity and nomad)
- It was made similiar to search graphql date structure
- Uses flat date structure
- You can check new structure in these records:

[Itineray](`../records/Itinerary`)
[Sector](`../records/Sector`)
[Segment](`../records/Segment`)

To implement `Itinerary` you have to import **_flatten_** function.

**Example:**

```js
import { flatten } from "@kiwicom/nitro/lib/records/Itinerary";

<Itinerary itinerary={flatten(ItineraryOneWay)} />;
```
