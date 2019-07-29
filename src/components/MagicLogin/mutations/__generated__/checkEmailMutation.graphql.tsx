/**
 * @flow
 * @relayHash 9f85597d24fbf9b5c3ab67452a0f6eeb
 */

/* eslint-disable */

'use strict';

/*::
import { ConcreteRequest } from 'relay-runtime';
export type checkEmailMutationVariables = {
  email: string,
  brand: any,
};
export type checkEmailMutationResponse = {
  +checkEmail: ?{
    +result: ?{
      +hasKiwiAccount: ?boolean,
      +hasFacebook: ?boolean,
      +hasGoogle: ?boolean,
      +hasBooking: ?boolean,
    }
  }
};
export type checkEmailMutation = {
  variables: checkEmailMutationVariables,
  response: checkEmailMutationResponse,
};
*/


/*
mutation checkEmailMutation(
  $email: String!
  $brand: Brand!
) {
  checkEmail(email: $email, brand: $brand) {
    result {
      hasKiwiAccount
      hasFacebook
      hasGoogle
      hasBooking
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "email",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "brand",
    "type": "Brand!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "checkEmail",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "brand",
        "variableName": "brand"
      },
      {
        "kind": "Variable",
        "name": "email",
        "variableName": "email"
      }
    ],
    "concreteType": "CheckEmailResponse",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "result",
        "storageKey": null,
        "args": null,
        "concreteType": "CheckEmailResult",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "hasKiwiAccount",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "hasFacebook",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "hasGoogle",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "hasBooking",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "checkEmailMutation",
    "type": "RootMutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "checkEmailMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "checkEmailMutation",
    "id": null,
    "text": "mutation checkEmailMutation(\n  $email: String!\n  $brand: Brand!\n) {\n  checkEmail(email: $email, brand: $brand) {\n    result {\n      hasKiwiAccount\n      hasFacebook\n      hasGoogle\n      hasBooking\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '490e0b3b264bed2f0a12f64be92c6165';
module.exports = node;
