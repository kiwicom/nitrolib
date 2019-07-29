/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import { ReaderFragment } from 'relay-runtime';
import { FragmentReference } from "relay-runtime";
declare export opaque type MulticityTrips_item$ref: FragmentReference;
declare export opaque type MulticityTrips_item$fragmentType: MulticityTrips_item$ref;
export type MulticityTrips_item = {
  +databaseId: ?number,
  +destinationImageUrl: ?string,
  +passengerCount: ?number,
  +start: ?{
    +localTime: ?any,
    +airport: ?{
      +city: ?{
        +name: ?string
      }
    },
  },
  +end: ?{
    +localTime: ?any,
    +airport: ?{
      +city: ?{
        +name: ?string
      }
    },
  },
  +trips: ?$ReadOnlyArray<?{
    +departure: ?{
      +airport: ?{
        +city: ?{
          +name: ?string
        }
      }
    }
  }>,
  +__typename: "BookingMulticity",
  +$refType: MulticityTrips_item$ref,
};
export type MulticityTrips_item$data = MulticityTrips_item;
export type MulticityTrips_item$key = {
  +$data?: MulticityTrips_item$data,
  +$fragmentRefs: MulticityTrips_item$ref,
};
*/


const node/*: ReaderFragment*/ = (function(){
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
  (v0/*: any*/)
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
      "name": "start",
      "storageKey": null,
      "args": null,
      "concreteType": "RouteStop",
      "plural": false,
      "selections": (v1/*: any*/)
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "end",
      "storageKey": null,
      "args": null,
      "concreteType": "RouteStop",
      "plural": false,
      "selections": (v1/*: any*/)
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
          "selections": [
            (v0/*: any*/)
          ]
        }
      ]
    }
  ]
};
})();
// prettier-ignore
(node/*: any*/).hash = '3da289a9a16bcdf3fa060ae8e4a9af77';
module.exports = node;
