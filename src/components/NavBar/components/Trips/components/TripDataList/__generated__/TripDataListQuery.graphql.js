/**
 * @flow
 * @relayHash 8efa50ba030bc3ae6935b687bdc2f659
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type TripHeader_trips$ref = any;
type TripList_list$ref = any;
export type TripDataListQueryVariables = {||};
export type TripDataListQueryResponse = {|
  +customerBookings: ?{|
    +$fragmentRefs: TripList_list$ref & TripHeader_trips$ref
  |}
|};
export type TripDataListQuery = {|
  variables: TripDataListQueryVariables,
  response: TripDataListQueryResponse,
|};
*/


/*
query TripDataListQuery {
  customerBookings {
    ...TripList_list
    ...TripHeader_trips
  }
}

fragment TripList_list on BookingInterfaceConnection {
  edges {
    node {
      __typename
      id
      isPastBooking
      destinationImageUrl
      ...OneWayTrips_item
      ...MulticityTrips_item
      ...ReturnTrips_item
    }
  }
}

fragment TripHeader_trips on BookingInterfaceConnection {
  edges {
    node {
      __typename
      isPastBooking
      id
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
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "databaseId",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "passengerCount",
  "args": null,
  "storageKey": null
},
v3 = {
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
    (v0/*: any*/)
  ]
},
v4 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "localTime",
    "args": null,
    "storageKey": null
  },
  (v3/*: any*/)
],
v5 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "departure",
  "storageKey": null,
  "args": null,
  "concreteType": "RouteStop",
  "plural": false,
  "selections": (v4/*: any*/)
},
v6 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "arrival",
  "storageKey": null,
  "args": null,
  "concreteType": "RouteStop",
  "plural": false,
  "selections": (v4/*: any*/)
},
v7 = [
  (v5/*: any*/),
  (v6/*: any*/)
],
v8 = [
  (v3/*: any*/)
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "TripDataListQuery",
    "type": "RootQuery",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "customerBookings",
        "storageKey": null,
        "args": null,
        "concreteType": "BookingInterfaceConnection",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "TripList_list",
            "args": null
          },
          {
            "kind": "FragmentSpread",
            "name": "TripHeader_trips",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "TripDataListQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "customerBookings",
        "storageKey": null,
        "args": null,
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
                    "name": "__typename",
                    "args": null,
                    "storageKey": null
                  },
                  (v0/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "isPastBooking",
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
                      (v1/*: any*/),
                      (v2/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "outbound",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Trip",
                        "plural": false,
                        "selections": (v7/*: any*/)
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
                          (v6/*: any*/),
                          (v5/*: any*/)
                        ]
                      }
                    ]
                  },
                  {
                    "kind": "InlineFragment",
                    "type": "BookingMulticity",
                    "selections": [
                      (v1/*: any*/),
                      (v2/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "start",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "RouteStop",
                        "plural": false,
                        "selections": (v4/*: any*/)
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "end",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "RouteStop",
                        "plural": false,
                        "selections": (v4/*: any*/)
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
                            "selections": (v8/*: any*/)
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "arrival",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "RouteStop",
                            "plural": false,
                            "selections": (v8/*: any*/)
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "kind": "InlineFragment",
                    "type": "BookingOneWay",
                    "selections": [
                      (v1/*: any*/),
                      (v2/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "trip",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Trip",
                        "plural": false,
                        "selections": (v7/*: any*/)
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
    "text": "query TripDataListQuery {\n  customerBookings {\n    ...TripList_list\n    ...TripHeader_trips\n  }\n}\n\nfragment TripList_list on BookingInterfaceConnection {\n  edges {\n    node {\n      __typename\n      id\n      isPastBooking\n      destinationImageUrl\n      ...OneWayTrips_item\n      ...MulticityTrips_item\n      ...ReturnTrips_item\n    }\n  }\n}\n\nfragment TripHeader_trips on BookingInterfaceConnection {\n  edges {\n    node {\n      __typename\n      isPastBooking\n      id\n    }\n  }\n}\n\nfragment OneWayTrips_item on BookingOneWay {\n  databaseId\n  destinationImageUrl\n  passengerCount\n  __typename\n  trip {\n    departure {\n      localTime\n      airport {\n        city {\n          name\n        }\n        id\n      }\n    }\n    arrival {\n      localTime\n      airport {\n        city {\n          name\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment MulticityTrips_item on BookingMulticity {\n  databaseId\n  destinationImageUrl\n  passengerCount\n  __typename\n  start {\n    localTime\n    airport {\n      city {\n        name\n      }\n      id\n    }\n  }\n  end {\n    localTime\n    airport {\n      city {\n        name\n      }\n      id\n    }\n  }\n  trips {\n    departure {\n      airport {\n        city {\n          name\n        }\n        id\n      }\n    }\n    arrival {\n      airport {\n        city {\n          name\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment ReturnTrips_item on BookingReturn {\n  databaseId\n  destinationImageUrl\n  passengerCount\n  __typename\n  outbound {\n    departure {\n      localTime\n      airport {\n        city {\n          name\n        }\n        id\n      }\n    }\n    arrival {\n      localTime\n      airport {\n        city {\n          name\n        }\n        id\n      }\n    }\n  }\n  inbound {\n    arrival {\n      localTime\n      airport {\n        city {\n          name\n        }\n        id\n      }\n    }\n    departure {\n      localTime\n      airport {\n        city {\n          name\n        }\n        id\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '65b258ef9cb945a973d4e4892f88f656';
module.exports = node;
