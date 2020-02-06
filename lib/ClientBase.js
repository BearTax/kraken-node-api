'use strict'

const queryString = require('querystring');
const crypto = require('crypto');
const rp = require('request-promise');
const BASE_URL = 'https://api.kraken.com/0/'

class ClientBase {

  constructor(apiKey, apiSecret) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.timeout = 20000;
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

  _signature(path, params) {
    const nonce = crypto.randomBytes(16).toString('base64');

    const postData = queryString.stringify(params);
    const hashDigest = new crypto
      .createHash('sha256')
      .update(nonce + postData)
      .digest('hex');

    return new crypto
      .createHmac('sha512', this.apiSecret)
      .update(path + hashDigest, 'utf8')
      .digest('base64');
  }

  _headers(path, params) {
    return {
      'API-Key': this.apiKey,
      'API-Sign': this.signature(path, params)
    };
  }

  /*global BASE_URL*/
  /*eslint no-undef: "error"*/
  _options(method, path, params) {
    let options = {
      method: method,
      uri: BASE_URL + path,
      qs: params,
      json: true
    };

    if(this._isPrivatePath(path)) {
      options.headers = this._headers();
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
    if(path.indexOf('/') > 0) {
      return path.split('/')[0] === 'private';
    } else {
      throw new Error(path + ': Not a valid path');
    }
  }
}

module.exports = ClientBase;
