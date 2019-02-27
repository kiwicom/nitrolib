# InitAuth

Calls APIs for you, handles loading state and supplies context with _Relay_ environment with the auth token. Supplied callbacks are only there for the side effects:
* saving token to cookies on **login**
* removing token from cookies on **logout**
* redirecting the user on **social login**
* popping a note to check email on **register**
* redirecting the user to MMB on **my booking**
