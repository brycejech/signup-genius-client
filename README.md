# signup-genius-client
NodeJS Signup Genius API Client

# SignupGeniusClient Class

## Installation
```bash
npm install signup-genius-client
```

## Usage

**Note**: You must have a SignUpGenius Pro account and API key to access the API.

```js
'use strict';

const Client = require('signup-genius-client'),
      apiKey = 'YourAPIKey';

const client = new Client(apiKey);

// Promises
client.getAllSignups()
    .then(signups => {
        // Do something with signup data
    })
    .catch(e => {
        // Handle error
    });

// Async/Await
(async () => {

    try{
        const signups = await client.getAllSignups();
        // Do something with signup data
    }
    catch(e){
        // Handle error
    }
})();
```

## Methods

### SignupGeniusClient.prototype.getProfile()

```js
client.getProfile()
    .then(profile => {
        // Do something with profile data
    })
    .catch(e => {
        // Handle error
    })
```

#### Profile Schema
```js
{
    // Account info
    memberid:   Number,
    firstname:  String,
    lastname:   String,
    issubadmin: Boolean,
    adminfor:   String,
    subscription: {
        ispro:    Boolean,
        prolevel: String
    },

    // Contact info
    email:          String,
    mobilephone:    String,
    workphone:      String,
    homephone:      String,
    preferredphone: String,

    // Location info
    address1: String,
    address2: String,
    city:     String,
    state:    String,
    zipcode:  String
}
```

### SignupGeniusClient.prototype.getAllSignups()

### SignupGeniusClient.prototype.getActiveSignups()

### SignupGeniusClient.prototype.getExpiredSignups()

### SignupGeniusClient.prototype.getSignupReport(signupID)

### SignupGeniusClient.prototype.getSignupRegistrants(signupID)

## Information

[SignUpGenius API documentation](https://developer.signupgenius.com/developer/keybaseddocs)
