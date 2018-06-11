/**
 * @flow
 * @relayHash cca467c2525941210ad3856c468d2cfa
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type currenciesQueryVariables = {||};
export type currenciesQueryResponse = {|
  +currencies: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +code: ?string,
        +rate: ?number,
      |}
    |}>
  |}
|};
*/


/*
query currenciesQuery {
  currencies {
    edges {
      node {
        code
        rate
        id
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "code",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "rate",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "currenciesQuery",
  "id": null,
  "text": "query currenciesQuery {\n  currencies {\n    edges {\n      node {\n        code\n        rate\n        id\n      }\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "currenciesQuery",
    "type": "RootQuery",
    "metadata": null,
    "argumentDefinitions": [],
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
                  v0,
                  v1
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "currenciesQuery",
    "argumentDefinitions": [],
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
                  v0,
                  v1,
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
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '79c696ba72c7aa66cbb3a43f552b223a';
module.exports = node;
