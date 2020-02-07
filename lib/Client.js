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
    return this._httpGet('public/Spread', params);
  }


  /**
   *
   * @param {object} params
   *          *
   */
  balance() {
    return this._httpPost('private/Balance', null);
  }

  /**
   *
   * @param {object} params
   *          * aclass = asset class (optional): currency (default)
   *          * asset = base asset used to determine balance (default = ZUSD)
   */
  tradeBalance(params = null) {
    return this._httpPost('private/TradeBalance', params)
  }

  /**
   *
   * @param {object} params
   *          * trades = whether or not to include trades in output (optional.  default = false)
   *          * userref = restrict results to given user reference id (optional)
   */
  openOrders(params) {
    return this._httpPost('private/OpenOrders', params);
  }

  /**
   *
   * @param {object} params
   *          * trades = whether or not to include trades in output (optional.  default = false)
   *          * userref = restrict results to given user reference id (optional)
   *          * start = starting unix timestamp or order tx id of results (optional.  exclusive)
   *          * end = ending unix timestamp or order tx id of results (optional.  inclusive)
   *          * ofs = result offset
   *          * closetime = which time to use (optional) : ('open' | 'close' | 'both' (default))
   */
  closedOrders(params) {
    return this._httpPost('private/ClosedOrders', params);
  }

  /**
   *
   * @param {object} params
   *          * trades = whether or not to include trades in output (optional.  default = false)
   *          * userref = restrict results to given user reference id (optional)
   *          * txid = comma delimited list of transaction ids to query info about (50 maximum)
   */
  queryOrders(params) {
    return this._httpPost('private/QueryOrders', params);
  }


  /**
   *
   * @param {object} params
   *          * type = type of trade (optional)
   *              'all' = all types (default)
   *              'any position' = any position (open or closed)
   *              'closed position' = positions that have been closed
   *              'closing position' = any trade closing all or part of a position
   *              'no position' = non-positional trades
   *          * trades = whether or not to include trades related to position in output (optional.  default = false)
   *          * start = starting unix timestamp or trade tx id of results (optional.  exclusive)
   *          * end = ending unix timestamp or trade tx id of results (optional.  inclusive)
   *          * ofs = result offset
   */
  tradesHistory(params) {
    return this._httpPost('private/TradesHistory', params)
  }


  /**
   *
   * @param {object} params
   *          * txid = comma delimited list of transaction ids to query info about (20 maximum)
   *          * trades = whether or not to include trades related to position in output (optional.  default = false)
   */
  queryTrades(params) {
    return this._httpPost('private/QueryTrades', params);
  }

  /**
   *
   * @param {object} params
   *          * txid = comma delimited list of transaction ids to restrict output to
   *          * docalcs = whether or not to include profit/loss calculations (optional.  default = false)
   *          * consolidation = what to consolidate the positions data around (optional.)
   *                market = will consolidate positions based on market pair
   */
  openPositions(params) {
    return this._httpPost('private/OpenPositions', params);
  }

  /**
   *
   * @param {object} params
   *          * aclass = asset class (optional):
   *                currency (default)
   *          * asset = comma delimited list of assets to restrict output to (optional.  default = all)
   *          * type = type of ledger to retrieve (optional):
   *              'all '(default), 'deposit', 'withdrawal', 'trade', 'margin'
   *          * start = starting unix timestamp or ledger id of results (optional.  exclusive)
   *          * end = ending unix timestamp or ledger id of results (optional.  inclusive)
   *          * ofs = result offset
   */
  ledgers(params = null) {
    return this._httpPost('private/Ledgers', params);
  }

  /**
   *
   * @param {object} params
   *          * id = comma delimited list of ledger ids to query info about (20 maximum)
   */
  queryLedgers(params) {
    return this._httpPost('private/QueryLedgers', params);
  }

  /**
   *
   * @param {object} params
   *          * pair = comma delimited list of asset pairs to get fee info on (optional)
   *          * fee-info = whether or not to include fee info in results (optional)
   */
  tradeVolume(params = null) {
    return this._httpPost('private/TradeVolume', params);
  }

  /**
   *
   * @param {object} params
   *          * description = report description info
   *          * report = report type (trades/ledgers)
   *          * format = (CSV/TSV) (optional.  default = CSV)
   *          * fields = comma delimited list of fields to include in report (optional.  default = all)
   *            Note: field options are based on report type
   *            <trades>
   *                ordertxid
   *                time
   *                ordertype
   *                price
   *                cost
   *                fee
   *                vol
   *                margin
   *                misc
   *                ledgers
   *            <ledgers>
   *                refid
   *                time
   *                type
   *                aclass
   *                asset
   *                amount
   *                fee
   *                balance
   *           * asset = comma delimited list of assets to restrict output to (optional.  default = all)
   *           * starttm = report start time (optional.  default = one year before now):
   *                <n> = unix timestamp of start time
   *           * endtm = report end time (optional.  default = now):
   *                <n> = unix timestamp of end time
   */
  addExport(params) {
    return this._httpPost('private/AddExport', params);
  }

  /**
   *
   * @param {object} params
   *          * id = report id
   *          * descr = report description info
   *          * format = (CSV/TSV)
   *          * report = report type (trades/ledgers)
   *          * status = status of order:
   *              Queued = report has been queued for creation
   *              Processing = report is being processed
   *              Processed = report has been procesed
   *          * createdtm = time report was created
   *          * expiretm = time report expires
   *          * starttm = report start time
   *          * endtm = report end time
   *          * completedtm = time report was completed
   *          * aclass = asset class
   *          * asset = comma delimited list of assets
   *          * fields = comma delimited list of fields
   *              <trades>
   *                  txid
   *                  ordertxid
   *                  pair
   *                  time
   *                  type
   *                  ordertype
   *                  price
   *                  cost
   *                  fee
   *                  vol
   *                  margin
   *                  misc
   *                  ledgers
   *              <ledgers>
   *                  txid
   *                  refid
   *                  time
   *                  type
   *                  aclass
   *                  asset
   *                  amount
   *                  fee
   *                  balance
   */
  exportStatus(params) {
    return this._httpPost('private/ExportStatus', params);
  }

  /**
   *
   * @param {object} params
   *          * id = report id
   */
  retrieveExport(params) {
    return this._httpPost('private/RetrieveExport', params);
  }

  /**
   *
   * @param {object} params
   *          * type = remove type (cancel/delete)
   *          * id = report id
   */
  removeExport(params) {
    return this._httpPost('private/RemoveExport', params);
  }

  // Private user trading

  /**
   *
   * @param {object} params
   *          * Check https://www.kraken.com/en-us/features/api
   */
  addOrder(params) {
    return this._httpPost('private/AddOrder', params);
  }

  /**
   *
   * @param {object} params
   *          * txid = transaction id
   */
  cancelOrder(params) {
    return this._httpPost('private/CancelOrder', params);
  }

  // Private user funding

  /**
   *
   * @param {object} params
   *          * aclass = asset class (optional):
   *              currency (default)
   *          * asset = asset being deposited

   */
  depositMethods(params) {
    return this._httpPost('private/DepositMethods', params);
  }

  /**
   *
   * @param {object} params
   *          * aclass = asset class (optional):
   *              currency (default)
   *          * asset = asset being deposited
   *          * method = name of the deposit method
   *          * new = whether or not to generate a new address (optional.  default = false)
   */
  depositAddresses(params) {
    return this._httpPost('private/DepositAddresses', params);
  }

  /**
   *
   * @param {object} params
   *          * aclass = asset class (optional):
   *              currency (default)
   *          * asset = asset being deposited
   *          * method = name of the deposit method

   */
  depositStatus(params) {
    return this._httpPost('private/DepositStatus', params);
  }

  /**
   *
   * @param {object} params
   *          * aclass = asset class (optional):
   *              currency (default)
   *          * asset = asset being withdrawn
   *          * key = withdrawal key name, as set up on your account
   *          * amount = amount to withdraw
   */
  withdrawInfo(params) {
    return this._httpPost('private/WithdrawInfo', params);
  }

  /**
   *
   * @param {object} params
   *          * aclass = asset class (optional):
   *              currency (default)
   *          * asset = asset being withdrawn
   *          * key = withdrawal key name, as set up on your account
   *          * amount = amount to withdraw, including fees
   */
  withdraw(params) {
    return this._httpPost('private/Withdraw', params);
  }

  /**
   *
   * @param {object} params
   *          * aclass = asset class (optional):
   *              currency (default)
   *          * asset = asset being withdrawn
   *          * method = withdrawal method name (optional)
   */
  withdrawStatus(params) {
    return this._httpPost('private/WithdrawStatus', params);
  }


  /**
   *
   * @param {object} params
   *          * aclass = asset class (optional):
   *              currency (default)
   *          * asset = asset being withdrawn
   *          * refid = withdrawal reference id
   */
  withdrawCancel(params) {
    return this._httpPost('private/WithdrawCancel', params);
  }

  /**
   *
   * @param {object} params
   *          * asset = asset being withdrawn
   *          * to = which wallet the funds are being transferred to
   *              Futures Wallet (default)
   *          * from = which wallet the funds are being transferred from
   *              Spot Wallet (default)
   *          * amount = amount to withdraw, including fees
   */
  walletTransfer(params) {
    return this._httpPost('private/WalletTransfer', params);
  }

  /**
   *  Note: Please select the permission 'Access WebSockets API'
   *  while creating the API key to be able to generate the authentication token.
   */
  getWebSocketsToken() {
    return this._httpPost('private/GetWebSocketsToken', null);
  }

}

let handler = {
  get: function (target, name) {
    return name in target ? target[name] : 'no func homie!'
  }
};

Client = new Proxy(Client, handler);

module.exports = Client;
