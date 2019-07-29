
import { AuthUser } from "../../../records/Auth";

type RelayInput = {
  +token: ?string,
  +identity: ?{
    +id: string,
    +email: ?string,
    +firstName: ?string,
    +lastName: ?string,
    +emailVerified: ?boolean,
  },
  +bookingIdentity: ?{
    +affiliateId: ?string,
    +discounts: ?{
      +credits: ?number,
      +card: ?number,
    },
    +balances: ?$ReadOnlyArray<?{
      +amount: ?string,
      +currencyId: ?string,
    }>,
  },
};

const toUser = (user: RelayInput): AuthUser => ({
  type: "user",
  token: user.token || ,
  user: {
    id: user.identity?.id || ,
    email: user.identity?.email || ,
    verified: user.identity?.emailVerified || false,
    firstname: user.identity?.firstName || ,
    lastname: user.identity?.lastName || ,
    affiliateId: user.bookingIdentity?.affiliateId || ,
    cardDiscount: user.bookingIdentity?.discounts?.card || 0,
    balanceDiscount: user.bookingIdentity?.discounts?.credits || 0,
    balances: (user.bookingIdentity?.balances || []).filter(Boolean).map(balance => ({
      amount: balance.amount || "0",
      currency: balance.currencyId || "EUR",
    })),
  },
});

export default toUser;
