/**
 * @flow
 * @relayHash 5e3384efe1ac16170b948d353c737b61
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type PlaceResult_item$ref = any;
export type PlaceResultQueryVariables = {|
  id: string,
|};
export type PlaceResultQueryResponse = {|
  +location: ?{|
    +$fragmentRefs: PlaceResult_item$ref,
  |},
|};
*/


/*
query PlaceResultQuery(
  $id: String!
) {
  location(id: $id) {
    ...PlaceResult_item
  }
}

fragment PlaceResult_item on Location {
  locationId
  name
  type
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
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "PlaceResultQuery",
  "id": null,
  "text": "query PlaceResultQuery(\n  $id: String!\n) {\n  location(id: $id) {\n    ...PlaceResult_item\n  }\n}\n\nfragment PlaceResult_item on Location {\n  locationId\n  name\n  type\n  country {\n    locationId\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "PlaceResultQuery",
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
            "name": "PlaceResult_item",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "PlaceResultQuery",
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
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "name",
            "args": null,
            "storageKey": null
          },
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
(node/*: any*/).hash = '2f9217d24680ccba0b8e9b43cae701b0';
module.exports = node;
