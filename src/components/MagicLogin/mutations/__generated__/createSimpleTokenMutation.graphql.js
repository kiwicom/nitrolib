/**
 * @flow
 * @relayHash a13b7c54bec11bde5ae56aa0e847abb4
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type SimpleTokenErrorCode = "NOT_FOUND" | "UNKNOWN" | "%future added value";
export type CreateSimpleTokenInput = {|
  email: string,
  origin: DateAndIataCodeInput,
  bookingId: number,
|};
export type DateAndIataCodeInput = {|
  date: any,
  iataCode: string,
|};
export type createSimpleTokenMutationVariables = {|
  input: CreateSimpleTokenInput
|};
export type createSimpleTokenMutationResponse = {|
  +createSimpleToken: ?{|
    +token?: ?string,
    +directAccessURL?: ?string,
    +code?: ?SimpleTokenErrorCode,
  |}
|};
export type createSimpleTokenMutation = {|
  variables: createSimpleTokenMutationVariables,
  response: createSimpleTokenMutationResponse,
|};
*/


/*
mutation createSimpleTokenMutation(
  $input: CreateSimpleTokenInput!
) {
  createSimpleToken(input: $input) {
    __typename
    ... on SimpleToken {
      token
      directAccessURL
    }
    ... on SimpleTokenError {
      code
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "CreateSimpleTokenInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "CreateSimpleTokenInput!"
  }
],
v2 = {
  "kind": "InlineFragment",
  "type": "SimpleTokenError",
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "code",
      "args": null,
      "storageKey": null
    }
  ]
},
v3 = {
  "kind": "InlineFragment",
  "type": "SimpleToken",
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "token",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "directAccessURL",
      "args": null,
      "storageKey": null
    }
  ]
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "createSimpleTokenMutation",
    "type": "RootMutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createSimpleToken",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "createSimpleTokenMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createSimpleToken",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "__typename",
            "args": null,
            "storageKey": null
          },
          (v2/*: any*/),
          (v3/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "createSimpleTokenMutation",
    "id": null,
    "text": "mutation createSimpleTokenMutation(\n  $input: CreateSimpleTokenInput!\n) {\n  createSimpleToken(input: $input) {\n    __typename\n    ... on SimpleToken {\n      token\n      directAccessURL\n    }\n    ... on SimpleTokenError {\n      code\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '9624dd914333d82ecfdd2ec762962778';
module.exports = node;
