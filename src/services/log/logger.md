A service substituting FE's current `cuckoo`.

Setup:
* get session data with the `init` function from the [session](./services#session) service
* set attributes of the global `statics` variable
* call the `log` function

Also exports the `getGlobals` function that returns globals `LogLady` expects.
