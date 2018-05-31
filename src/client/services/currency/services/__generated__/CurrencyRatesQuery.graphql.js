/**
 * @flow
 * @relayHash fb326c73925bf379833232e98ae385a7
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CurrencyRatesQueryVariables = {||};
export type CurrencyRatesQueryResponse = {|
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
query CurrencyRatesQuery {
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
  "name": "CurrencyRatesQuery",
  "id": null,
  "text": "query CurrencyRatesQuery {\n  currencies {\n    edges {\n      node {\n        code\n        rate\n        id\n      }\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "CurrencyRatesQuery",
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
    "name": "CurrencyRatesQuery",
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
(node/*: any*/).hash = '04d2b7a7c3e5b357333d868d478c7bae';
module.exports = node;
