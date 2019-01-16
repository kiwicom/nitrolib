/**
 * @flow
 * @relayHash f9f2b99406e2a79761c3308e7aa5d0f4
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type LocationPickerResultList_list$ref = any;
export type LocationPickerQueryVariables = {|
  input: string
|};
export type LocationPickerQueryResponse = {|
  +allLocations: ?{|
    +$fragmentRefs: LocationPickerResultList_list$ref
  |}
|};
export type LocationPickerQuery = {|
  variables: LocationPickerQueryVariables,
  response: LocationPickerQueryResponse,
|};
*/


/*
query LocationPickerQuery(
  $input: String!
) {
  allLocations(last: 50, search: $input) {
    ...LocationPickerResultList_list
  }
}

fragment LocationPickerResultList_list on LocationConnection {
  edges {
    node {
      id
      type
      code
      name
      country {
        code
        name
      }
      ...LocationPickerRow_item
    }
  }
}

fragment LocationPickerRow_item on Location {
  locationId
  type
  name
  code
  slug
  location {
    lat
    lng
  }
  city {
    locationId
    name
    slug
    code
  }
  country {
    locationId
    name
    slug
    code
  }
  subdivision {
    locationId
    name
    slug
    code
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
    "name": "last",
    "value": 50,
    "type": "Int"
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
  "name": "code",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "locationId",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "slug",
  "args": null,
  "storageKey": null
},
v6 = [
  v4,
  v3,
  v5,
  v2
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "LocationPickerQuery",
  "id": null,
  "text": "query LocationPickerQuery(\n  $input: String!\n) {\n  allLocations(last: 50, search: $input) {\n    ...LocationPickerResultList_list\n  }\n}\n\nfragment LocationPickerResultList_list on LocationConnection {\n  edges {\n    node {\n      id\n      type\n      code\n      name\n      country {\n        code\n        name\n      }\n      ...LocationPickerRow_item\n    }\n  }\n}\n\nfragment LocationPickerRow_item on Location {\n  locationId\n  type\n  name\n  code\n  slug\n  location {\n    lat\n    lng\n  }\n  city {\n    locationId\n    name\n    slug\n    code\n  }\n  country {\n    locationId\n    name\n    slug\n    code\n  }\n  subdivision {\n    locationId\n    name\n    slug\n    code\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "LocationPickerQuery",
    "type": "RootQuery",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "allLocations",
        "storageKey": null,
        "args": v1,
        "concreteType": "LocationConnection",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "LocationPickerResultList_list",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "LocationPickerQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "allLocations",
        "storageKey": null,
        "args": v1,
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
                    "name": "type",
                    "args": null,
                    "storageKey": null
                  },
                  v2,
                  v3,
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "country",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "LocationArea",
                    "plural": false,
                    "selections": [
                      v2,
                      v3,
                      v4,
                      v5
                    ]
                  },
                  v4,
                  v5,
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "location",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Coordinates",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "lat",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "lng",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "city",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "LocationArea",
                    "plural": false,
                    "selections": v6
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "subdivision",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "LocationArea",
                    "plural": false,
                    "selections": v6
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '2d45cc81c784d75b8c943feb47b77b9e';
module.exports = node;
