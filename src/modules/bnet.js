'use strict';
exports.__esModule = true;
exports.D2API = void 0;
/*
this contains all the bnet api calls
*/
const ClientOAuth2 = require('client-oauth2');
const uuid_1 = require('uuid');
require('superagent');
const request = require('superagent');
const D2API = /** @class */ (function () {
  // refreshToken: string;
  function D2API(clientId, clientSecret, bnetApiKey, devBypass) {
    this.accessTokenUri = 'https://www.bungie.net/platform/app/oauth/token/';
    this.authorizationUri = 'https://www.bungie.net/en/oauth/authorize';
    this.redirectUri = 'https://thinking.ninja/';
    this.apiBaseUri = 'https://www.bungie.net/Platform';
    this.accessToken = '';
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.apiKey = bnetApiKey;
    this.oauthClient = new ClientOAuth2({
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      accessTokenUri: this.accessTokenUri,
      authorizationUri: this.authorizationUri,
      redirectUri: this.redirectUri,
      state: uuid_1.v4(),
    });
    if (!devBypass) {
      // Put access-token fetching code here, need a browser for that cuz need redirect to work or something.
    }
  }
  D2API.prototype.bypassOauthWithToken = function (accessToken) {
    this.accessToken = accessToken;
  };
  D2API.prototype.getUserByDisplayName = function (displayName) {
    const _this = this;
    return new Promise((resolve, reject) => {
      request
        .get(
          _this.apiBaseUri +
            '/Destiny2/SearchDestinyPlayer/All/' +
            displayName +
            '/'
        )
        .set('X-API-Key', _this.apiKey)
        .query('access_token=' + _this.accessToken)
        .then(res => {
          // console.log(res.body);
          const parsedRes = res.body;
          const userData = [];
          parsedRes.Response.forEach(element => {
            const oneUserObj = {
              membershipId: element.membershipId,
              membershipType: element.membershipType,
            };
            userData.push(oneUserObj);
          });
          resolve(userData);
        })
        ['catch'](err => {
          reject(err);
        });
    });
  };
  D2API.prototype.getCharacters = function (membership) {
    const _this = this;
    return new Promise((resolve, reject) => {
      request
        .get(
          _this.apiBaseUri +
            '/Destiny2/' +
            membership.membershipType +
            '/Profile/' +
            membership.membershipId +
            '/'
        )
        .set('X-API-Key', _this.apiKey)
        .query('access_token=' + _this.accessToken)
        .query('components=Characters')
        .then(res => {
          const parsedRes = res.body;
          const charactersData = parsedRes.Response.characters.data;
          const chars = [];
          for (const char in charactersData) {
            chars.push(charactersData[char]);
          }
          resolve(chars);
        })
        ['catch'](err => {
          reject(err);
        });
    });
  };
  return D2API;
})();
exports.D2API = D2API;
