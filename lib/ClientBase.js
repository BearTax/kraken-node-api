'use strict'

const crypto = require('crypto');
const rp = require('request-promise');
const querystring = require('querystring');

const BASE_URL = 'https://api.kraken.com/'
const VERSION = '0';

class ClientBase {

  constructor(apiKey, apiSecret) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.timeout = 5000;
  }

  /**
   *
   * @param path
   * @param request
   * @param nonce
   * @returns {string}
   *
   *
   * API-Key = API key
   * API-Sign = Message signature using HMAC-SHA512 of (URI path + SHA256(nonce + POST data)) and base64 decoded secret API key
   */

  _signature(path, params, nonce) {
    const message = querystring.stringify(params);
    const base64Secret = Buffer.from(this.apiSecret, 'base64');

    const hash_digest = new crypto.createHash('sha256')
    .update(nonce + message)
    .digest('binary');

    const sign = new crypto.createHmac('sha512', base64Secret)
    .update(path + hash_digest, 'binary')
    .digest('base64');
    return sign;
  }

  _headers(path, params) {
    return {
      'User-Agent': 'Node.js Library',
      'API-Key': this.apiKey,
      'API-Sign': this._signature(path, params, params.nonce)
    };
  }

  _options(method, path, params) {
    let options = {
      method: method,
      uri: BASE_URL + VERSION + '/' + path,
      transform: JSON.parse,
      timeout: this.timeout
    };
    if (!params) params = {}
    let timestamp = (new Date()).getTime();
    params.nonce =  timestamp + ('0000' + timestamp++).slice(-5);
    if (params && Object.keys(params).length > 0) {
      if (method === 'GET') options.qs = params;
      if (method === 'POST') options.body = querystring.stringify(params);
    }

    if (this._isPrivatePath(path)) {
      options.headers = this._headers('/' + VERSION + '/' + path, params);
    }
    return options;
  }

  _httpGet(path, params) {
    return rp(this._options('GET', path, params));
  }

  _httpPost(path, params) {
    return rp(this._options('POST', path, params));
  }

  /**
   * 
   * @param {string} path Kraken API endpoint path
   * examples: 'public/Spread', 'private/Balance'
   * 
   * @returns {boolean}
   */
  _isPrivatePath(path) {
    if (path.indexOf('/') > 0) {
      return path.split('/')[0] === 'private';
    } else {
      throw new Error(path + ': Not a valid path');
    }
  }
}

module.exports = ClientBase;