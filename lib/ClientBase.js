const queryString = require('querystring');
const crypto = require('crypto');

class ClientBase {

  constructor(apiKey, apiSecret) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
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

  signature(path, request) {
    const nonce = crypto.randomBytes(16).toString('base64');

    const postData = queryString.stringify(request);
    const hashDigest = new crypto
      .createHash('sha256')
      .update(nonce + postData)
      .digest("hex");

    return new crypto
      .createHmac('sha512', this.apiSecret)
      .update(path + hashDigest, "utf8")
      .digest('base64')
  }

  headers(path, params) {
    return {
      'API-Key': this.apiKey,
      'API-Sign': this.signature(path, params)
    }
  }

  __httpGet(path, params) {
    const headers = this.headers(path, params);

  }

  __httpPost(path, params) {
    const headers = this.headers(path, params);
  }
}

module.exports = ClientBase;
