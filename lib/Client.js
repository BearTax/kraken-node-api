const ClientBase = require('./ClientBase');

class Client extends ClientBase {

  constructor(apiKey, apiSecret) {
    super(apiKey, apiSecret);
  }

  time() {
    return this._httpGet('public/Time', {})
  }

  /**
   * 
   * @param {object} params 
   * info = info to retrieve (optional)   :   info = all info (default)
   * aclass = asset class (optional)      :   currency (default) 
   * asset = comma delimited list of assets to get info on (optional) : default = all for given asset class
   */
  assetInfo(params) {
    return this._httpGet('public/Assets', params)
  }

  balance(params) {
    return this._httpPost('private/Balance', params)
  }

  tradeBalance(params) {
    return this._httpPost('private/TradeBalance', params)
  }

  tradesHistory(params) {
    return this._httpPost('private/TradesHistory', params)
  }

}

module.exports = Client;
