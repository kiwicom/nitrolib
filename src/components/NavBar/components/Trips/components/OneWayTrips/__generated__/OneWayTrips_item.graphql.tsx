/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import { ReaderFragment } from 'relay-runtime';
import { FragmentReference } from "relay-runtime";
declare export opaque type OneWayTrips_item$ref: FragmentReference;
declare export opaque type OneWayTrips_item$fragmentType: OneWayTrips_item$ref;
export type OneWayTrips_item = {
  +databaseId: ?number,
  +destinationImageUrl: ?string,
  +passengerCount: ?number,
  +trip: ?{
    +departure: ?{
      +localTime: ?any,
      +airport: ?{
        +city: ?{
          +name: ?string
        }
      },
    },
    +arrival: ?{
      +localTime: ?any,
      +airport: ?{
        +city: ?{
          +name: ?string
        }
      },
    },
  },
  +__typename: "BookingOneWay",
  +$refType: OneWayTrips_item$ref,
};
export type OneWayTrips_item$data = OneWayTrips_item;
export type OneWayTrips_item$key = {
  +$data?: OneWayTrips_item$data,
  +$fragmentRefs: OneWayTrips_item$ref,
};
*/


const node/*: ReaderFragment*/ = (function(){
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
];
return {
  "kind": "Fragment",
  "name": "OneWayTrips_item",
  "type": "BookingOneWay",
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
      "name": "trip",
      "storageKey": null,
      "args": null,
      "concreteType": "Trip",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "departure",
          "storageKey": null,
          "args": null,
          "concreteType": "RouteStop",
          "plural": false,
          "selections": (v0/*: any*/)
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "arrival",
          "storageKey": null,
          "args": null,
          "concreteType": "RouteStop",
          "plural": false,
          "selections": (v0/*: any*/)
        }
      ]
    }
  ]
};
})();
// prettier-ignore
(node/*: any*/).hash = '9815b8aec8eb2f7144f9310a42074c29';
module.exports = node;
