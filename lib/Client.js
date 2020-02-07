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

  /**
   *
   * @param {object} params
   *            * info = { info(default) | leverage | fees | margin }
   *            * pair = comma delimited list of asset pairs to get info on (optional.  default = all)
   */
  assetPairs(params = null) {
    return this._httpGet('public/AssetPairs', params)
  }

  /**
   *
   * @param {object} params
   *          * pair = comma delimited list of asset pairs to get info on
   */
  ticker(params) {
    return this._httpGet('public/Ticker', params)
  }

  /**
   *
   * @param {object} params
   *          * pair = asset pair to get OHLC data for
   *          * interval = time frame interval in minutes (optional):
	 *                       1 (default), 5, 15, 30, 60, 240, 1440, 10080, 21600
   *          * since = return committed OHLC data since given id (optional.  exclusive)
   */
  ohlc(params) {
    return this._httpGet('public/OHLC', params)
  }

  /**
   *
   * @param {object} params
   *          * pair = asset pair to get market depth for
   *          * count = maximum number of asks/bids (optional)
   * 
   */
  depth(params) {
    return this._httpGet('public/Depth', params)
  }

  /**
   *
   * @param {object} params
   *          * pair = asset pair to get trade data for
   *          * since = return trade data since given id (optional.  exclusive)
   */
  trades(params) {
    return this._httpGet('public/Trades', params)
  }

  /**
   *
   * @param {object} params
   *          *
   */
  spread(params) {
    return this._httpGet('public/Spread', params)
  }

  /**
   *
   * @param {object} params
   *          *
   */
  balance(params = null) {
    return this._httpPost('private/Balance', params)
  }

  /**
   *
   * @param {object} params
   *          *
   */
  tradeBalance(params = null) {
    return this._httpPost('private/TradeBalance', params)
  }

  /**
   *
   * @param {object} params
   *          *
   */
  tradesHistory(params) {
    return this._httpPost('private/TradesHistory', params)
  }

}

let handler = {
  get: function (target, name) {
    return name in target ? target[name] : 'no func homie!'
  }
};

Client = new Proxy(Client, handler);

module.exports = Client;
