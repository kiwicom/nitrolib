/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type ReturnTrips_item$ref: FragmentReference;
export type ReturnTrips_item = {|
  +databaseId: ?number,
  +destinationImageUrl: ?string,
  +passengerCount: ?number,
  +outbound: ?{|
    +departure: ?{|
      +localTime: ?any,
      +airport: ?{|
        +city: ?{|
          +name: ?string
        |}
      |},
    |},
    +arrival: ?{|
      +localTime: ?any,
      +airport: ?{|
        +city: ?{|
          +name: ?string
        |}
      |},
    |},
  |},
  +inbound: ?{|
    +arrival: ?{|
      +localTime: ?any,
      +airport: ?{|
        +city: ?{|
          +name: ?string
        |}
      |},
    |},
    +departure: ?{|
      +localTime: ?any,
      +airport: ?{|
        +city: ?{|
          +name: ?string
        |}
      |},
    |},
  |},
  +__typename: "BookingReturn",
  +$refType: ReturnTrips_item$ref,
|};
*/


const node/*: ConcreteFragment*/ = (function(){
var v0 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "localTime",
    "args": null,
    "storageKey": null
  },
  {
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
  }
],
v1 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "departure",
  "storageKey": null,
  "args": null,
  "concreteType": "RouteStop",
  "plural": false,
  "selections": v0
},
v2 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "arrival",
  "storageKey": null,
  "args": null,
  "concreteType": "RouteStop",
  "plural": false,
  "selections": v0
};
return {
  "kind": "Fragment",
  "name": "ReturnTrips_item",
  "type": "BookingReturn",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "databaseId",
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
      "name": "outbound",
      "storageKey": null,
      "args": null,
      "concreteType": "Trip",
      "plural": false,
      "selections": [
        v1,
        v2
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "inbound",
      "storageKey": null,
      "args": null,
      "concreteType": "Trip",
      "plural": false,
      "selections": [
        v2,
        v1
      ]
    }
  ]
};
})();
// prettier-ignore
(node/*: any*/).hash = '006bb71b2347de8a23ead90d84765c69';
module.exports = node;
