/**
 * @flow
 * @relayHash dcc4342df622b686e3a5fd74ca1d7031
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type LocationPickerResultList_list$ref = any;
export type Locale = "ar_AE" | "ar_BH" | "ar_JO" | "ar_KW" | "ar_OM" | "ar_QA" | "ar_SA" | "bg_BG" | "ca_ES" | "cs_CZ" | "da_DK" | "de_AT" | "de_CH" | "de_DE" | "el_GR" | "en_AU" | "en_CA" | "en_EE" | "en_GB" | "en_HK" | "en_IE" | "en_IN" | "en_MY" | "en_NZ" | "en_PH" | "en_SG" | "en_US" | "en_ZA" | "es_AR" | "es_CL" | "es_CO" | "es_EC" | "es_ES" | "es_MX" | "es_PE" | "fi_FI" | "fr_BE" | "fr_CA" | "fr_FR" | "he_IL" | "hr_HR" | "hu_HU" | "id_ID" | "is_IS" | "it_IT" | "ja_JP" | "ko_KR" | "lt_LT" | "nb_NO" | "nl_NL" | "nn_NO" | "no_NO" | "pl_PL" | "pt_BR" | "pt_PT" | "ro_RO" | "ru_BY" | "ru_KZ" | "ru_RU" | "sk_SK" | "sr_RS" | "sv_SE" | "th_TH" | "tr_TR" | "uk_UA" | "vi_VN" | "zh_CN" | "zh_TW" | "%future added value";
export type LocationType = "airport" | "autonomous_territory" | "bus_station" | "city" | "country" | "station" | "subdivision" | "%future added value";
export type LocationsOptionsInput = {|
  locale?: ?Locale,
  locationType?: ?LocationType,
  locationTypes?: ?$ReadOnlyArray<LocationType>,
|};
export type LocationPickerQueryVariables = {|
  input: string,
  options?: ?LocationsOptionsInput,
|};
export type LocationPickerQueryResponse = {|
  +allLocations: ?{|
    +pageInfo: {|
      +startCursor: ?string
    |},
    +$fragmentRefs: LocationPickerResultList_list$ref,
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
  $options: LocationsOptionsInput
) {
  allLocations(last: 50, search: $input, options: $options) {
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
  },
  {
    "kind": "LocalArgument",
    "name": "options",
    "type": "LocationsOptionsInput",
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
    "name": "options",
    "variableName": "options",
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
    "name": "LocationPickerQuery",
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
    "name": "LocationPickerQuery",
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
    "name": "LocationPickerQuery",
    "id": null,
    "text": "query LocationPickerQuery(\n  $input: String!\n  $options: LocationsOptionsInput\n) {\n  allLocations(last: 50, search: $input, options: $options) {\n    ...LocationPickerResultList_list\n    pageInfo {\n      startCursor\n    }\n  }\n}\n\nfragment LocationPickerResultList_list on LocationConnection {\n  edges {\n    node {\n      id\n      ...LocationPickerRow_item\n    }\n  }\n}\n\nfragment LocationPickerRow_item on Location {\n  locationId\n  type\n  name\n  code\n  slug\n  location {\n    lat\n    lng\n  }\n  city {\n    locationId\n    name\n    slug\n    code\n  }\n  country {\n    locationId\n    name\n    slug\n    code\n  }\n  subdivision {\n    locationId\n    name\n    slug\n    code\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '832e281681f2a4de1dcfe78e3f41bfa4';
module.exports = node;
