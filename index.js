'use strict';

const sgClient = require('./signup-genius-client');

const apiKey  = require('./conf').apiKey;

const client = new sgClient(apiKey);

(async () => {

    const data = { };

    const user = await client.getProfile();

    data.accountName  = `${ user.firstname } ${ user.lastname }`;
    data.accountEmail = user.email;
    data.accountID    = user.memberid;
    data.signups      = [];

    const signups = await client.getAllSignups();


    const promises = signups.map(async (signup) => {

        const obj = {
            title:          signup.title,
            id:             signup.signupid,
            start:          new Date(signup.startdate * 1000),
            end:            new Date(signup.enddate   * 1000),
            url:            signup.signupurl,
            totalSlots:     signup.slotmetrics.totalslots,
            slotsAvailable: signup.slotmetrics.totalavailableslots,
            slotsFilled:    signup.slotmetrics.totalslotsfilled,
            registrants:    [ ]
        }

        const title = signup.title,
              id    = signup.signupid,
              start = new Date(signup.startdate * 1000);

        const registrants = await client.getSignupRegistrants(id);

        registrants.forEach(person => {
            obj.registrants.push({
                name: `${ person.firstname } ${ person.lastname }`,
                email: person.email
            })
        });

        data.signups.push(obj);

        return new Promise((resolve, reject) => resolve(obj));
    });

    Promise.all(promises)
        .then(() => {
            console.log(JSON.stringify(data, null, 2))
        })
        .catch(e => console.log(e));

})();


/*
    ========
    PROMISES
    ========
*/

/*
client.getProfile()
    .then(user => {
        console.log(`Account Name: ${ user.firstname } ${ user.lastname }`);
        console.log(`Account Email: ${ user.email }`);
        console.log(`Account ID: ${ user.memberid }`);
        console.log('\n########################\n');
    })
    .then(() => {
        client.getAllSignups()
            .then(signups => {

                signups.forEach(signup => {
                    const title = signup.title,
                          id    = signup.signupid,
                          start = new Date(signup.startdate * 1000);

                    client.getSignupRegistrants(id)
                        .then(registrants => {
                            console.log(`Signup Title: ${ title }`);
                            console.log(`Signup ID: ${ id }`);
                            console.log(`Start Date: ${ start }`);
                            console.log('Registrants:');

                            registrants.forEach(person => {
                                console.log(`${ person.firstname } ${ person.lastname } - ${ person.email }`);
                            });
                            console.log('-------------------------\n')
                        })
                        .catch(e => console.log(e));
                })

            })
            .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
*/
