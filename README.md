# signup-genius-client
NodeJS Signup Genius API Client

# SignupGeniusClient Class

## Installation
```bash
npm install signup-genius-client
```

## Usage

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

### SignupGeniusClient.prototype.getAllSignups()

### SignupGeniusClient.prototype.getActiveSignups()

### SignupGeniusClient.prototype.getExpiredSignups()

### SignupGeniusClient.prototype.getSignupReport(signupID)

### SignupGeniusClient.prototype.getSignupRegistrants(signupID)
