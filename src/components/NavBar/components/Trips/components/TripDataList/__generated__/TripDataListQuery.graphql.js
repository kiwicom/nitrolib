/**
 * @flow
 * @relayHash 69a49a0df5b83d1c68d84b8d9690e766
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type TripHeader_list$ref = any;
type TripListBottom_list$ref = any;
type TripList_list$ref = any;
export type TripDataListQueryVariables = {|
  first?: ?number
|};
export type TripDataListQueryResponse = {|
  +customerBookings: ?{|
    +$fragmentRefs: TripHeader_list$ref & TripList_list$ref & TripListBottom_list$ref
  |}
|};
export type TripDataListQuery = {|
  variables: TripDataListQueryVariables,
  response: TripDataListQueryResponse,
|};
*/


/*
query TripDataListQuery(
  $first: Int
) {
  customerBookings(first: $first) {
    ...TripHeader_list
    ...TripList_list
    ...TripListBottom_list
  }
}

fragment TripHeader_list on BookingInterfaceConnection {
  edges {
    node {
      __typename
      isPastBooking
      id
    }
  }
}

fragment TripList_list on BookingInterfaceConnection {
  edges {
    node {
      __typename
      id
      isPastBooking
      ...OneWayTrips_item
      ...MulticityTrips_item
      ...ReturnTrips_item
    }
  }
}

fragment TripListBottom_list on BookingInterfaceConnection {
  edges {
    node {
      __typename
      isPastBooking
      id
      destinationImageUrl
    }
  }
}

fragment OneWayTrips_item on BookingOneWay {
  databaseId
  destinationImageUrl
  passengerCount
  __typename
  trip {
    departure {
      localTime
      airport {
        city {
          name
        }
        id
      }
    }
    arrival {
      localTime
      airport {
        city {
          name
        }
        id
      }
    }
  }
}

fragment MulticityTrips_item on BookingMulticity {
  databaseId
  destinationImageUrl
  passengerCount
  __typename
  start {
    localTime
    airport {
      city {
        name
      }
      id
    }
  }
  end {
    localTime
    airport {
      city {
        name
      }
      id
    }
  }
  trips {
    departure {
      airport {
        city {
          name
        }
        id
      }
    }
    arrival {
      airport {
        city {
          name
        }
        id
      }
    }
  }
}

fragment ReturnTrips_item on BookingReturn {
  databaseId
  destinationImageUrl
  passengerCount
  __typename
  outbound {
    departure {
      localTime
      airport {
        city {
          name
        }
        id
      }
    }
    arrival {
      localTime
      airport {
        city {
          name
        }
        id
      }
    }
  }
  inbound {
    arrival {
      localTime
      airport {
        city {
          name
        }
        id
      }
    }
    departure {
      localTime
      airport {
        city {
          name
        }
        id
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "first",
    "type": "Int",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first",
    "type": "Int"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "databaseId",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "passengerCount",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "airport",
  "storageKey": null,
  "args": null,
  "concreteType": "Location",
  "plural": false,
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "city",
      "storageKey": null,
      "args": null,
      "concreteType": "LocationArea",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "name",
          "args": null,
          "storageKey": null
        }
      ]
    },
    (v2/*: any*/)
  ]
},
v6 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "localTime",
    "args": null,
    "storageKey": null
  },
  (v5/*: any*/)
],
v7 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "departure",
  "storageKey": null,
  "args": null,
  "concreteType": "RouteStop",
  "plural": false,
  "selections": (v6/*: any*/)
},
v8 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "arrival",
  "storageKey": null,
  "args": null,
  "concreteType": "RouteStop",
  "plural": false,
  "selections": (v6/*: any*/)
},
v9 = [
  (v7/*: any*/),
  (v8/*: any*/)
],
v10 = [
  (v5/*: any*/)
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "TripDataListQuery",
    "type": "RootQuery",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "customerBookings",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "BookingInterfaceConnection",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "TripHeader_list",
            "args": null
          },
          {
            "kind": "FragmentSpread",
            "name": "TripList_list",
            "args": null
          },
          {
            "kind": "FragmentSpread",
            "name": "TripListBottom_list",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "TripDataListQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "customerBookings",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "BookingInterfaceConnection",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "edges",
            "storageKey": null,
            "args": null,
            "concreteType": "BookingInterfaceEdge",
            "plural": true,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "node",
                "storageKey": null,
                "args": null,
                "concreteType": null,
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "isPastBooking",
                    "args": null,
                    "storageKey": null
                  },
                  (v2/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "__typename",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "destinationImageUrl",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "type": "BookingReturn",
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "outbound",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Trip",
                        "plural": false,
                        "selections": (v9/*: any*/)
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "inbound",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Trip",
                        "plural": false,
                        "selections": [
                          (v8/*: any*/),
                          (v7/*: any*/)
                        ]
                      }
                    ]
                  },
                  {
                    "kind": "InlineFragment",
                    "type": "BookingMulticity",
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "start",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "RouteStop",
                        "plural": false,
                        "selections": (v6/*: any*/)
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "end",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "RouteStop",
                        "plural": false,
                        "selections": (v6/*: any*/)
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "trips",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Trip",
                        "plural": true,
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "departure",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "RouteStop",
                            "plural": false,
                            "selections": (v10/*: any*/)
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "arrival",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "RouteStop",
                            "plural": false,
                            "selections": (v10/*: any*/)
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "kind": "InlineFragment",
                    "type": "BookingOneWay",
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "trip",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Trip",
                        "plural": false,
                        "selections": (v9/*: any*/)
                      }
                    ]
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
    "name": "TripDataListQuery",
    "id": null,
    "text": "query TripDataListQuery(\n  $first: Int\n) {\n  customerBookings(first: $first) {\n    ...TripHeader_list\n    ...TripList_list\n    ...TripListBottom_list\n  }\n}\n\nfragment TripHeader_list on BookingInterfaceConnection {\n  edges {\n    node {\n      __typename\n      isPastBooking\n      id\n    }\n  }\n}\n\nfragment TripList_list on BookingInterfaceConnection {\n  edges {\n    node {\n      __typename\n      id\n      isPastBooking\n      ...OneWayTrips_item\n      ...MulticityTrips_item\n      ...ReturnTrips_item\n    }\n  }\n}\n\nfragment TripListBottom_list on BookingInterfaceConnection {\n  edges {\n    node {\n      __typename\n      isPastBooking\n      id\n      destinationImageUrl\n    }\n  }\n}\n\nfragment OneWayTrips_item on BookingOneWay {\n  databaseId\n  destinationImageUrl\n  passengerCount\n  __typename\n  trip {\n    departure {\n      localTime\n      airport {\n        city {\n          name\n        }\n        id\n      }\n    }\n    arrival {\n      localTime\n      airport {\n        city {\n          name\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment MulticityTrips_item on BookingMulticity {\n  databaseId\n  destinationImageUrl\n  passengerCount\n  __typename\n  start {\n    localTime\n    airport {\n      city {\n        name\n      }\n      id\n    }\n  }\n  end {\n    localTime\n    airport {\n      city {\n        name\n      }\n      id\n    }\n  }\n  trips {\n    departure {\n      airport {\n        city {\n          name\n        }\n        id\n      }\n    }\n    arrival {\n      airport {\n        city {\n          name\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment ReturnTrips_item on BookingReturn {\n  databaseId\n  destinationImageUrl\n  passengerCount\n  __typename\n  outbound {\n    departure {\n      localTime\n      airport {\n        city {\n          name\n        }\n        id\n      }\n    }\n    arrival {\n      localTime\n      airport {\n        city {\n          name\n        }\n        id\n      }\n    }\n  }\n  inbound {\n    arrival {\n      localTime\n      airport {\n        city {\n          name\n        }\n        id\n      }\n    }\n    departure {\n      localTime\n      airport {\n        city {\n          name\n        }\n        id\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '0f466cacd2cf1ee48c18298a024bbb62';
module.exports = node;
