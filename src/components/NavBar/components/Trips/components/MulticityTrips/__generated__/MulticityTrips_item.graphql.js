/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type MulticityTrips_item$ref: FragmentReference;
export type MulticityTrips_item = {|
  +id: string,
  +destinationImageUrl: ?string,
  +passengerCount: ?number,
  +start: ?{|
    +localTime: ?any,
    +airport: ?{|
      +city: ?{|
        +name: ?string
      |}
    |},
  |},
  +end: ?{|
    +localTime: ?any,
    +airport: ?{|
      +city: ?{|
        +name: ?string
      |}
    |},
  |},
  +trips: ?$ReadOnlyArray<?{|
    +departure: ?{|
      +airport: ?{|
        +city: ?{|
          +name: ?string
        |}
      |}
    |},
    +arrival: ?{|
      +airport: ?{|
        +city: ?{|
          +name: ?string
        |}
      |}
    |},
  |}>,
  +__typename: "BookingMulticity",
  +$refType: MulticityTrips_item$ref,
|};
*/


const node/*: ConcreteFragment*/ = (function(){
var v0 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "airport",
  "storageKey": null,
  "args": null,
  "concreteType": "Location",
  "plural": false,
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "city",
      "storageKey": null,
      "args": null,
      "concreteType": "LocationArea",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "name",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
},
v1 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "localTime",
    "args": null,
    "storageKey": null
  },
  v0
],
v2 = [
  v0
];
return {
  "kind": "Fragment",
  "name": "MulticityTrips_item",
  "type": "BookingMulticity",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "destinationImageUrl",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "passengerCount",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "__typename",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "start",
      "storageKey": null,
      "args": null,
      "concreteType": "RouteStop",
      "plural": false,
      "selections": v1
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "end",
      "storageKey": null,
      "args": null,
      "concreteType": "RouteStop",
      "plural": false,
      "selections": v1
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "trips",
      "storageKey": null,
      "args": null,
      "concreteType": "Trip",
      "plural": true,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "departure",
          "storageKey": null,
          "args": null,
          "concreteType": "RouteStop",
          "plural": false,
          "selections": v2
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "arrival",
          "storageKey": null,
          "args": null,
          "concreteType": "RouteStop",
          "plural": false,
          "selections": v2
        }
      ]
    }
  ]
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f32f46d6913439158d04b1270c5e1021';
module.exports = node;
