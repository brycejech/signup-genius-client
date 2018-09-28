'use strict';

const request = require('request');


function signupGeniusClient(apiKey){
    if(!apiKey) throw new Error('apiKey required');

    this.baseUrl = 'https://api.signupgenius.com/v2/k';
    this.apiKey  = apiKey;

    return this;
}

signupGeniusClient.prototype.makeRequest = function makeRequest(url){
    return new Promise((resolve, reject) => {
        const opt = {
            url: url,
            method: 'GET',
            json: true,
            headers: {
                'accept': 'application/json'
            }
        }
        request(opt, (err, response, body) => {
            if(err) return reject(err);
            resolve(body);
        });
    });
}

signupGeniusClient.prototype.getProfile = function getProfile(){

    const url = `${ this.baseUrl }/user/profile/?user_key=${ this.apiKey }`;

    return new Promise((resolve, reject) => {
        this.makeRequest(url)
            .then(res => {
                if(res.success){
                    resolve(res.data);
                }
                reject(new Error('Error fetching profile'));

            })
            .catch(e => {
                reject(e);
            });
    });
}

signupGeniusClient.prototype.getAllSignups = function getAllSignups(){

    const url = `${ this.baseUrl }/signups/created/all/?user_key=${ this.apiKey }`;

    return new Promise((resolve, reject) => {
        this.makeRequest(url)
            .then(res => {
                if(res.success){
                    resolve(res.data);
                }
                reject(new Error('Error fetching signups'));
            })
            .catch(e => {
                reject(e);
            })
    });
}

signupGeniusClient.prototype.getSignupReport = function getSignupReport(signupID){

    const url = `${ this.baseUrl }/signups/report/all/${ signupID }/?user_key=${ this.apiKey }`;

    return new Promise((resolve, reject) => {
        this.makeRequest(url)
            .then(res => {
                if(res.success){
                    resolve(res.data);
                }
                reject(new Error(`Error fetching signup report for signupID ${ signupID }`));
            })
            .catch(e => reject(e));
    });
}

signupGeniusClient.prototype.getSignupRegistrants = function getSignupRegistrants(signupID){

    const url = `${ this.baseUrl }/signups/report/filled/${ signupID }/?user_key=${ this.apiKey }`;

    return new Promise((resolve, reject) => {
        this.makeRequest(url)
            .then(res => {
                if(res.success){
                    resolve(res.data.signup);
                }
                reject(new Error(`Error fetching signup filled report for signupID ${ signupID }`));
            })
            .catch(e => reject(e));
    });
}



module.exports = signupGeniusClient;
