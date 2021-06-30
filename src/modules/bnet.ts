/*
this contains all the bnet api calls
*/
import * as ClientOAuth2 from 'client-oauth2'
import {v4 as uuid} from 'uuid'
import 'superagent'
import request = require('superagent')
import {Character, MembershipObj, GenericResponse} from '../types'

export class D2API {
  clientId: string
  clientSecret: string
  apiKey: string
  accessTokenUri = 'https://www.bungie.net/platform/app/oauth/token/'
  authorizationUri = 'https://www.bungie.net/en/oauth/authorize'
  redirectUri = 'https://thinking.ninja/'
  oauthClient: ClientOAuth2

  apiBaseUri = 'https://www.bungie.net/Platform'
  accessToken = ''
  // refreshToken: string

  constructor(
    clientId: string,
    clientSecret: string,
    bnetApiKey: string,
    devBypass: boolean
  ) {
    this.clientId = clientId
    this.clientSecret = clientSecret
    this.apiKey = bnetApiKey

    this.oauthClient = new ClientOAuth2({
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      accessTokenUri: this.accessTokenUri,
      authorizationUri: this.authorizationUri,
      redirectUri: this.redirectUri,
      state: uuid(),
    })

    if (!devBypass) {
      // Put access-token fetching code here, need a browser for that cuz need redirect to work or something.
    }
  }

  bypassOauthWithToken(accessToken: string) {
    this.accessToken = accessToken
  }

  getUserByDisplayName(displayName: string) {
    return new Promise<MembershipObj[]>((resolve, reject) => {
      request
        .get(
          `${this.apiBaseUri}/Destiny2/SearchDestinyPlayer/All/${displayName}/`
        )
        .set('X-API-Key', this.apiKey)
        .query(`access_token=${this.accessToken}`)
        .then(res => {
          // console.log(res.body)
          const parsedRes: GenericResponse = res.body
          const userData: MembershipObj[] = []
          parsedRes.Response.forEach((element: MembershipObj) => {
            const oneUserObj: MembershipObj = {
              membershipId: element.membershipId,
              membershipType: element.membershipType,
            }
            userData.push(oneUserObj)
          })
          resolve(userData)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  getCharacters(membership: MembershipObj) {
    return new Promise<Character[]>((resolve, reject) => {
      request
        .get(
          `${this.apiBaseUri}/Destiny2/${membership.membershipType}/Profile/${membership.membershipId}/`
        )
        .set('X-API-Key', this.apiKey)
        .query(`access_token=${this.accessToken}`)
        .query('components=Characters')
        .then(res => {
          const parsedRes: GenericResponse = res.body
          const charactersData = parsedRes.Response.characters.data

          const chars: Character[] = []

          for (const char in charactersData) {
            chars.push(charactersData[char])
          }

          resolve(chars)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
