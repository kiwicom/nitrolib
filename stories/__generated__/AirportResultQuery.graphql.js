/**
 * @flow
 * @relayHash e182e938145995e359458c018d81366f
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type AirportResult_item$ref = any;
export type AirportResultQueryVariables = {|
  id: string
|};
export type AirportResultQueryResponse = {|
  +location: ?{|
    +$fragmentRefs: AirportResult_item$ref
  |}
|};
*/


/*
query AirportResultQuery(
  $id: String!
) {
  location(id: $id) {
    ...AirportResult_item
  }
}

fragment AirportResult_item on Location {
  locationId
  name
  type
  city {
    name
  }
  country {
    locationId
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "id",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id",
    "type": "String!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "locationId",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "AirportResultQuery",
  "id": null,
  "text": "query AirportResultQuery(\n  $id: String!\n) {\n  location(id: $id) {\n    ...AirportResult_item\n  }\n}\n\nfragment AirportResult_item on Location {\n  locationId\n  name\n  type\n  city {\n    name\n  }\n  country {\n    locationId\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "AirportResultQuery",
    "type": "RootQuery",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "location",
        "storageKey": null,
        "args": v1,
        "concreteType": "Location",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "AirportResult_item",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "AirportResultQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "location",
        "storageKey": null,
        "args": v1,
        "concreteType": "Location",
        "plural": false,
        "selections": [
          v2,
          v3,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "type",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "city",
            "storageKey": null,
            "args": null,
            "concreteType": "LocationArea",
            "plural": false,
            "selections": [
              v3
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "country",
            "storageKey": null,
            "args": null,
            "concreteType": "LocationArea",
            "plural": false,
            "selections": [
              v2
            ]
          }
        ]
      }
    ]
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f418d2604bed0b888d83dd8e4ee726eb';
module.exports = node;
