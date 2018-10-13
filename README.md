# signup-genius-client
NodeJS Signup Genius API Client

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

# SignupGeniusClient Class

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

Gets a report of all signups (active and inactive)

```js
client.getAllSignups()
    .then(signups => {
        // Do something with signup data
    })
    .catch(e => {
        // Handle error
    })
```

#### Signups Schema

```js
[
    // Signup
    {
        // General
        signupid:    Number,
        title:       String,
        signupurl:   String,
        contactname: String,

        // Time info
        startdate:       Number, // Unix timestamp
        enddate:         Number, // Unix timestamp
        startdatestring: String,
        enddatestring:   String,
        starttime:       Number,
        endtime:         Number,
        offset:          String,

        // Images
        mainimage: String,
        thumbnail: String,

        // Group info
        groupid: Number,
        group:   String,

        // Slot info
        slotmetrics: {
            totalslots:          Number,
            totalslotsfilled:    Number,
            totalavailableslots: Number,
            percentageavailable: String,
            percentagefilled:    String
        }
    }
]
```

### SignupGeniusClient.prototype.getActiveSignups()

Gets a report of all active signups.

```js
client.getActiveSignups()
    .then(signups => {
        // Do something with signup data
    })
    .catch(e => {
        // Handle error
    })
```

#### Active Signups Schema

```js
[
    // Active Signup
    {
        // General
        signupid:    Number,
        title:       String,
        signupurl:   String,
        contactname: String,

        // Time info
        startdate:       Number,
        enddate:         Number,
        startdatestring: String,
        enddatestring:   String,
        starttime:       Number,
        endtime:         Number,

        // Images
        mainimage: String,
        thumbnail: String,

        // Group info
        groupid: Number,
        group:   String
    }
]
```

### SignupGeniusClient.prototype.getExpiredSignups()

Gets a report of all expired signups.

```js
client.getExpiredSignups()
    .then(signups => {
        // Do something with signup data
    })
    .catch(err => {
        // Handle error
    });
```

#### Expired Signups Schema

```js
[
    // Expired Signup
    {
        // General
        signupid:    Number,
        title:       String,
        signupurl:   String,
        contactname: String,

        // Time info
        startdate:       Number,
        enddate:         Number,
        startdatestring: String,
        enddatestring:   String,
        starttime:       Number,
        endtime:         Number,

        // Images
        mainimage: String,
        thumbnail: String,

        // Group info
        groupid: Number,
        group:   String
    }
]
```

### SignupGeniusClient.prototype.getSignupReport(signupID)

Gets a signup report that includes information about registered (filled) and unfilled slots for a given signup. If you are wanting information about filled slots only, you probably want to use the `client.getSignupRegistrants(signupID)` method instead.

```js
client.getSignupReport(signupID)
    .then(signups => {
        // Do something with signup data
    })
    .catch(err => {
        // Handle error
    });
```

#### Signup Report Schema

**Note:** The SignUp Genius API documentation indicates that there should also be an array of custom questions sent along with this response. There is a bug in their current API version (v2) that is preventing the `customquestions` array from being returned, even if the given signup does have custom questions.

```js
// Signup Report (filled and unfilled slots)
[
    {
        // General
        signupid:     Number,
        slotitemid:   Number,
        itemmemberid: Number,
        status:       String,
        item:         String,
        myqty:        Number,

        // Time info
        startdate:       Number,
        enddate:         Number,
        startdatestring: String,
        enddatestring:   String,
        starttime:       Number,
        endtime:         Number,

        // Location info
        address1: String,
        address2: String,
        city:     String,
        state:    String,
        zipcode:  String,
        country:  String,

        // User info
        firstname: String,
        lastname:  String,
        phone:     String,
        phonetype: String,

        amountpaid: String,

        // Array of custom question responses,
        // does not inlcude questions themselves
        customfields: [
            {
                customfieldid: Number,
                value:         String
            }
        ]
    }
]
```

### SignupGeniusClient.prototype.getSignupRegistrants(signupID)

Gets a report of registrants (filled slots) for a given signup.

```js
client.getSignupRegistrants(signupID)
    .then(signups => {
        // Do something with signup data
    })
    .catch(err => {
        // Handle error
    });
```

#### Signup Registrants Schema

**Note:** The SignUp Genius API documentation indicates that there should also be an array of custom questions sent along with this response. There is a bug in their current API version (v2) that is preventing the `customquestions` array from being returned, even if the given signup does have custom questions.

```js
// Signup Report (filled slots)
[
    {
        // General
        signupid:     Number,
        slotitemid:   Number,
        itemmemberid: Number,
        status:       String,
        item:         String,
        myqty:        Number,

        // Time info
        startdate:       Number,
        enddate:         Number,
        startdatestring: String,
        enddatestring:   String,
        starttime:       Number,
        endtime:         Number,

        // Location info
        address1: String,
        address2: String,
        city:     String,
        state:    String,
        zipcode:  String,
        country:  String,

        // User info
        firstname: String,
        lastname:  String,
        phone:     String,
        phonetype: String,

        amountpaid: String,

        // Array of custom question responses,
        // does not inlcude questions themselves
        customfields: [
            {
                customfieldid: Number,
                value:         String
            }
        ]
    }
]
```

### SignupGeniusClient.prototype.getSlotsAvailable

Gets a report of slots available for a given signup.

```js
client.getSignupRegistrants(signupID)
    .then(signups => {
        // Do something with signup data
    })
    .catch(err => {
        // Handle error
    });
```

#### Slots Available Schema

**Note:** The SignUp Genius API documentation indicates that there should also be an array of custom questions sent along with this response. There is a bug in their current API version (v2) that is preventing the `customquestions` array from being returned, even if the given signup does have custom questions.

```js
// Signup Report (available slots)
[
    // Note that for slots available, most information will be empty/falsy
    {
        // General
        signupid:     Number,
        slotitemid:   Number,
        itemmemberid: Number,
        status:       String,
        item:         String,
        myqty:        Number,

        // Time info
        startdate:       Number,
        enddate:         Number,
        startdatestring: String,
        enddatestring:   String,
        starttime:       Number,
        endtime:         Number,

        // Location info
        address1: String,
        address2: String,
        city:     String,
        state:    String,
        zipcode:  String,
        country:  String,

        // User info
        firstname: String,
        lastname:  String,
        phone:     String,
        phonetype: String,

        amountpaid: String,

        // Array of custom question responses,
        // does not inlcude questions themselves
        customfields: [
            {
                customfieldid: Number,
                value:         String
            }
        ]
    }
]
```

## Information

[SignUpGenius API documentation](https://developer.signupgenius.com/developer/keybaseddocs)
