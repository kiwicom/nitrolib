/**
 * @flow
 * @relayHash f234cf5044f9b3503eaee064ef6855d7
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type AirportList_list$ref = any;
export type AirportListDataQueryVariables = {|
  input: string
|};
export type AirportListDataQueryResponse = {|
  +allLocations: ?{|
    +$fragmentRefs: AirportList_list$ref
  |}
|};
export type AirportListDataQuery = {|
  variables: AirportListDataQueryVariables,
  response: AirportListDataQueryResponse,
|};
*/


/*
query AirportListDataQuery(
  $input: String!
) {
  allLocations(search: $input, options: {locationType: airport}) {
    ...AirportList_list
  }
}

fragment AirportList_list on LocationConnection {
  edges {
    node {
      locationId
      ...AirportResult_item
      id
    }
  }
}

fragment AirportResult_item on Location {
  locationId
  name
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
    "name": "input",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "options",
    "value": {
      "locationType": "airport"
    },
    "type": "LocationsOptionsInput"
  },
  {
    "kind": "Variable",
    "name": "search",
    "variableName": "input",
    "type": "String"
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
  "fragment": {
    "kind": "Fragment",
    "name": "AirportListDataQuery",
    "type": "RootQuery",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "allLocations",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "LocationConnection",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "AirportList_list",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "AirportListDataQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "allLocations",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "LocationConnection",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "edges",
            "storageKey": null,
            "args": null,
            "concreteType": "LocationEdge",
            "plural": true,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "node",
                "storageKey": null,
                "args": null,
                "concreteType": "Location",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "city",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "LocationArea",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/)
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
                      (v2/*: any*/)
                    ]
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "id",
                    "args": null,
                    "storageKey": null
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "AirportListDataQuery",
    "id": null,
    "text": "query AirportListDataQuery(\n  $input: String!\n) {\n  allLocations(search: $input, options: {locationType: airport}) {\n    ...AirportList_list\n  }\n}\n\nfragment AirportList_list on LocationConnection {\n  edges {\n    node {\n      locationId\n      ...AirportResult_item\n      id\n    }\n  }\n}\n\nfragment AirportResult_item on Location {\n  locationId\n  name\n  city {\n    name\n  }\n  country {\n    locationId\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ac5d0d52123d1c5371ab83d2f14a7146';
module.exports = node;
