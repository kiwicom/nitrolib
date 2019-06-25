/**
 * @flow
 * @relayHash c90468d7d23b5b530d5b20a082ca1b68
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type LocationPickerResultList_list$ref = any;
export type LocationPickerQueryHolidaysQueryVariables = {|
  input: string
|};
export type LocationPickerQueryHolidaysQueryResponse = {|
  +holidaysLocations: ?{|
    +pageInfo: {|
      +startCursor: ?string
    |},
    +$fragmentRefs: LocationPickerResultList_list$ref,
  |}
|};
export type LocationPickerQueryHolidaysQuery = {|
  variables: LocationPickerQueryHolidaysQueryVariables,
  response: LocationPickerQueryHolidaysQueryResponse,
|};
*/


/*
query LocationPickerQueryHolidaysQuery(
  $input: String!
) {
  holidaysLocations(last: 50, search: $input) {
    ...LocationPickerResultList_list
    pageInfo {
      startCursor
    }
  }
}

fragment LocationPickerResultList_list on LocationConnection {
  edges {
    node {
      id
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
    "type": "String!"
  }
],
v2 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "pageInfo",
  "storageKey": null,
  "args": null,
  "concreteType": "PageInfo",
  "plural": false,
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "startCursor",
      "args": null,
      "storageKey": null
    }
  ]
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "locationId",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "code",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "slug",
  "args": null,
  "storageKey": null
},
v7 = [
  (v3/*: any*/),
  (v4/*: any*/),
  (v6/*: any*/),
  (v5/*: any*/)
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "LocationPickerQueryHolidaysQuery",
    "type": "RootQuery",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "holidaysLocations",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "LocationConnection",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "LocationPickerResultList_list",
            "args": null
          },
          (v2/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "LocationPickerQueryHolidaysQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "holidaysLocations",
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
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "id",
                    "args": null,
                    "storageKey": null
                  },
                  (v3/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "type",
                    "args": null,
                    "storageKey": null
                  },
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
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
                    "selections": (v7/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "country",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "LocationArea",
                    "plural": false,
                    "selections": (v7/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "subdivision",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "LocationArea",
                    "plural": false,
                    "selections": (v7/*: any*/)
                  }
                ]
              }
            ]
          },
          (v2/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "LocationPickerQueryHolidaysQuery",
    "id": null,
    "text": "query LocationPickerQueryHolidaysQuery(\n  $input: String!\n) {\n  holidaysLocations(last: 50, search: $input) {\n    ...LocationPickerResultList_list\n    pageInfo {\n      startCursor\n    }\n  }\n}\n\nfragment LocationPickerResultList_list on LocationConnection {\n  edges {\n    node {\n      id\n      ...LocationPickerRow_item\n    }\n  }\n}\n\nfragment LocationPickerRow_item on Location {\n  locationId\n  type\n  name\n  code\n  slug\n  location {\n    lat\n    lng\n  }\n  city {\n    locationId\n    name\n    slug\n    code\n  }\n  country {\n    locationId\n    name\n    slug\n    code\n  }\n  subdivision {\n    locationId\n    name\n    slug\n    code\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '2c093e4f10d5fdbb66e6454c3894bf3d';
module.exports = node;
