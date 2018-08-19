/**
 * @flow
 * @relayHash f8dcc528b71d72c823e475a44bc28969
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type MenuGeo_geo$ref = any;
type MenuList_list$ref = any;
export type CurrencyQueryVariables = {|
  ip: any
|};
export type CurrencyQueryResponse = {|
  +currencies: ?{|
    +$fragmentRefs: MenuList_list$ref
  |},
  +geoIP: ?{|
    +$fragmentRefs: MenuGeo_geo$ref
  |},
|};
export type CurrencyQuery = {|
  variables: CurrencyQueryVariables,
  response: CurrencyQueryResponse,
|};
*/


/*
query CurrencyQuery(
  $ip: IP!
) {
  currencies {
    ...MenuList_list
  }
  geoIP(ip: $ip) {
    ...MenuGeo_geo
  }
}

fragment MenuList_list on CurrencyDetailConnection {
  ...CurrencyList_list
}

fragment MenuGeo_geo on GeoIP {
  isoCountryCode
}

fragment CurrencyList_list on CurrencyDetailConnection {
  edges {
    node {
      code
      name
      ...CurrencyItem_item
      id
    }
  }
}

fragment CurrencyItem_item on CurrencyDetail {
  code
  name
  format
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "ip",
    "type": "IP!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "ip",
    "variableName": "ip",
    "type": "IP!"
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "CurrencyQuery",
  "id": null,
  "text": "query CurrencyQuery(\n  $ip: IP!\n) {\n  currencies {\n    ...MenuList_list\n  }\n  geoIP(ip: $ip) {\n    ...MenuGeo_geo\n  }\n}\n\nfragment MenuList_list on CurrencyDetailConnection {\n  ...CurrencyList_list\n}\n\nfragment MenuGeo_geo on GeoIP {\n  isoCountryCode\n}\n\nfragment CurrencyList_list on CurrencyDetailConnection {\n  edges {\n    node {\n      code\n      name\n      ...CurrencyItem_item\n      id\n    }\n  }\n}\n\nfragment CurrencyItem_item on CurrencyDetail {\n  code\n  name\n  format\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "CurrencyQuery",
    "type": "RootQuery",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "currencies",
        "storageKey": null,
        "args": null,
        "concreteType": "CurrencyDetailConnection",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "MenuList_list",
            "args": null
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "geoIP",
        "storageKey": null,
        "args": v1,
        "concreteType": "GeoIP",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "MenuGeo_geo",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CurrencyQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "currencies",
        "storageKey": null,
        "args": null,
        "concreteType": "CurrencyDetailConnection",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "edges",
            "storageKey": null,
            "args": null,
            "concreteType": "CurrencyDetailEdge",
            "plural": true,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "node",
                "storageKey": null,
                "args": null,
                "concreteType": "CurrencyDetail",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "code",
                    "args": null,
                    "storageKey": null
                  },
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
                    "name": "format",
                    "args": null,
                    "storageKey": null
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
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "geoIP",
        "storageKey": null,
        "args": v1,
        "concreteType": "GeoIP",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "isoCountryCode",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c3fddbab256b7a83da28094e67dfd52a';
module.exports = node;
