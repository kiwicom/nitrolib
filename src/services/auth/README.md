# Auth

Contains everything regarding authentication.

**Examples:**

A fresh setup might look something like:

```js
// ...
import InitAuth from "@kiwicom/nitro/lib/components/InitAuth";
import { Provider as AuthProvider } from "@kiwicom/nitro/lib/services/auth/context";
import type { Brand } from "@kiwicom/nitro/lib/records/Brand";
// ...

const AUTH_COOKIE = "AUTH_TOKEN"; // or whatever you save it as

const brand: Brand = window.__BRAND__;

const handleMyBooking = (token: string) => {
  // redirect the user to MMB
}

const handleRegister = () => {
  // tell the user to check his email
}

const handleSocialAuth = (authURL: string) => {
  // redirect the user to the given URL
}

const handleSignIn = (token: string) => {
  // save the token into cookies as AUTH_COOKIE
}

const handleSignOut = () => {
  // remove AUTH_COOKIE from cookies
}

const NitroProvider = () => (
  <InitAuth
    token={cookies.get(AUTH_COOKIE) || null}
    brand={brand}
    redirectURL={window.location.href} // maybe clean it up from UTMs if needed, or add misc info
    onMyBooking={handleMyBooking}
    onRegister={handleRegister}
    onSocialAuth={handleSocialAuth}
    onSignIn={handleSignIn}
    onSignOut={handleSignOut}
  >
    {auth => (
      <AuthProvider value={auth}>
        <App />
      </AuthProvider>
    )}
  </InitAuth>
);
// ...
```

You can of course not use the `InitAuth` component and hook the provider up to your existing setup.
