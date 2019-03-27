/**
 * @flow
 * @relayHash d93fd70e104d9689a9ed8c4f8e4df564
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type LocationPickerResultList_list$ref = any;
export type LocationPickerHolidaysQueryVariables = {|
  input: string
|};
export type LocationPickerHolidaysQueryResponse = {|
  +holidaysLocations: ?{|
    +$fragmentRefs: LocationPickerResultList_list$ref
  |}
|};
export type LocationPickerHolidaysQuery = {|
  variables: LocationPickerHolidaysQueryVariables,
  response: LocationPickerHolidaysQueryResponse,
|};
*/


/*
query LocationPickerHolidaysQuery(
  $input: String!
) {
  holidaysLocations(last: 50, search: $input) {
    ...LocationPickerResultList_list
  }
}

fragment LocationPickerResultList_list on LocationConnection {
  edges {
    node {
      id
      holidaysLocationId: id(opaque: false)
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
  (v4/*: any*/),
  (v3/*: any*/),
  (v5/*: any*/),
  (v2/*: any*/)
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "LocationPickerHolidaysQuery",
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
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "LocationPickerHolidaysQuery",
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
                  {
                    "kind": "ScalarField",
                    "alias": "holidaysLocationId",
                    "name": "id",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "opaque",
                        "value": false,
                        "type": "Boolean"
                      }
                    ],
                    "storageKey": "id(opaque:false)"
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "type",
                    "args": null,
                    "storageKey": null
                  },
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "country",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "LocationArea",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/)
                    ]
                  },
                  (v4/*: any*/),
                  (v5/*: any*/),
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
                    "selections": (v6/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "subdivision",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "LocationArea",
                    "plural": false,
                    "selections": (v6/*: any*/)
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
    "name": "LocationPickerHolidaysQuery",
    "id": null,
    "text": "query LocationPickerHolidaysQuery(\n  $input: String!\n) {\n  holidaysLocations(last: 50, search: $input) {\n    ...LocationPickerResultList_list\n  }\n}\n\nfragment LocationPickerResultList_list on LocationConnection {\n  edges {\n    node {\n      id\n      holidaysLocationId: id(opaque: false)\n      type\n      code\n      name\n      country {\n        code\n        name\n      }\n      ...LocationPickerRow_item\n    }\n  }\n}\n\nfragment LocationPickerRow_item on Location {\n  locationId\n  type\n  name\n  code\n  slug\n  location {\n    lat\n    lng\n  }\n  city {\n    locationId\n    name\n    slug\n    code\n  }\n  country {\n    locationId\n    name\n    slug\n    code\n  }\n  subdivision {\n    locationId\n    name\n    slug\n    code\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '85e1c2cffb31ca72cdc63670bad37f29';
module.exports = node;
