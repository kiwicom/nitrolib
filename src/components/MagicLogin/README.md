# MagicLogin

Modal component handling the whole login flow with magic link.

**Docs**

[WIKI - New login flow with magic link](https://kiwi.wiki/frontend/wiki/docs/features/acc_newLogin/)

**Props**

- **disableSocialLogin** - disable the possibility to login via social network on intro screen, which enables to bypass the whole login flow and user can log in even without previously existing account. Default: *false*
- **initialScreen** - by default it shows intro screen where user is asked for e-mail based on which following steps are decided. You can pass `signUp` to display registration form immediately.
- **type** - Explains the reason why user is asked to login, current options are `mmb` to manage bookings, `help` to get personalized help & `refer` to refer a friend to get a bonus. Default: `mmb`
- **onClose** - callback to close the modal. TODO: should be handled probably by `ModalContext` in future.

**`data-test` attributes for acceptance tests**

- `MagicLogin` can be used to test if modal is opened as it wraps the whole login modal.
- Different stages of login process:
  - `MagicLogin-Intro` - initial screen of the login (unless registration was triggered immediately)
    - additional section `MagicLogin-LoginViaSocials` is appended on same level in DOM as `AccountLogin` unless login with social networks without e-mail check is disallowed.
  - `MagicLogin-CreateAccount` - registration form
  - `MagicLogin-Password` - login screen which asks for kiwi.com password.
  - `MagicLogin-SocialLogin` - screen which offers login via FB/Google after successful e-mail check.
  - `MagicLogin-NoAccount` - when user has no account or booking, this screen is displayed where he can either proceed with registration or go back to intro screen.
  - `MagicLogin-CheckEmail` - this is shown upon successful request to reset password or when e-mail with magic link is sent.
- `MagicLogin-CloseButton` - close button for the whole login modal.
- `MagicLogin-AskForMagic` - button that sends e-mail with magic link when clicked
- `MagicLogin-GetSingleBooking` - alternative one-time sign in form into single booking via bid & IATA code
- Also, all inputs should have its own `data-test` attribute corresponding to their purpose - `MagicLogin-Email`, `MagicLogin-Password`

**Example**

```js
import * as React from "react"
import MagicLogin from "@kiwicom/nitro/lib/components/MagicLogin"
import type { AuthUser } from "@kiwicom/nitro/lib/records/Auth"

type Provider = "facebook" | "google"

type ConnectorHandlers = {|
  onSocialLogin: (provider: Provider) => Promise<*>,
  onSignIn: (userInfo: AuthUser) => void,
|}

type OwnProps = {|
  disableSocialLogin: boolean,
  initialScreen: "intro" | "signUp",
  type: "mmb" | "help" | "refer",
  onClose: () => void,
|}

type Props = {|
  ...ConnectorHandlers,
  ...OwnProps,
|}

// onSignIn fn should handle usual action which takes place after successful login via email & password
const onSignIn = (user) => ({ type: LOGIN_SUCCESS, res: user })
// onSocialLogin fn should trigger full OAuth login process thought specified provider
const onSocialLogin = (provider: Provider) => {}

// Redux connector HOC
const connector: Connector<OwnProps, Props> = connect(
  null,
  dispatch => ({
    onSignIn: (user: AuthUser) => dispatch(onSignIn(user)),
    onSocialLogin: (provider: Provider) => dispatch(onSocialLogin(provider)),
  }),
)
export default connector(MagicLogin)
```

