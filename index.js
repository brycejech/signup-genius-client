'use strict';

const request = require('request');


function SignupGeniusClient(apiKey){
    if(!apiKey) throw new Error('apiKey required');

    this.baseUrl = 'https://api.signupgenius.com/v2/k';
    this.apiKey  = apiKey;

    return this;
}

SignupGeniusClient.prototype.makeRequest = function makeRequest(url){
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

SignupGeniusClient.prototype.getProfile = function getProfile(){

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

SignupGeniusClient.prototype.getAllSignups = function getAllSignups(){

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

SignupGeniusClient.prototype.getActiveSignups = function getActiveSignups(){

    const url = `${ this.baseUrl }/signups/created/active/?user_key=${ this.apiKey }`;

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

SignupGeniusClient.prototype.getExpiredSignups = function getExpiredSignups(){

    const url = `${ this.baseUrl }/signups/created/expired/?user_key=${ this.apiKey }`;

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

SignupGeniusClient.prototype.getSignupReport = function getSignupReport(signupID){

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

SignupGeniusClient.prototype.getSignupRegistrants = function getSignupRegistrants(signupID){

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

SignupGeniusClient.prototype.getSlotsAvailable = function getSlotsAvailable(signupID){

    const url = `${ this.baseUrl }/signups/report/available/${ signupID }/?user_key=${ this.apiKey }`;

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

module.exports = SignupGeniusClient;
