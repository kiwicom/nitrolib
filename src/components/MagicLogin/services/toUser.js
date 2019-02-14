// @flow strict
// TODO test
import type { AuthUser } from "../../../records/Auth";

type RelayInput = {|
  +token: ?string,
  +identity: ?{|
    +id: string,
    +email: ?string,
    +firstName: ?string,
    +lastName: ?string,
    +emailVerified: ?boolean,
  |},
|};

const toUser = (user: RelayInput): AuthUser => ({
  type: "user",
  token: user.token || "",
  user: {
    id: user.identity?.id || "",
    email: user.identity?.email || "",
    verified: user.identity?.emailVerified || false,
    firstname: user.identity?.firstName || "",
    lastname: user.identity?.lastName || "",
  },
});

export default toUser;
