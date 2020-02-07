const kraken = require('..');
const Client = kraken.Client;
const assert = require('assert');

const API_KEY = '<API-Key>';
const API_SECRET = '<API-Sign>';

describe('client private api', () => {
  const client = new Client(API_KEY, API_SECRET);

  it('should return balance', (done) => {
    client.balance().then(function(resp) {
      assert(resp.result);
      done();
    }).catch(err => {
      assert.fail(err);
    });
  });

  it('should return `ETH` trade balance', (done) => {
    client.tradeBalance({asset: 'ETH'}).then(function(resp) {
      assert(resp.result);
      // console.log(JSON.stringify(resp));
      done();
    }).catch(err => {
      assert.fail(err);
    });
  });

  it('should return open orders', (done) => {
    client.openOrders().then(function(resp) {
      assert(resp.result);
      // console.log(JSON.stringify(resp));
      assert(resp.result.open);
      done();
    }).catch(err => {
      assert.fail(err);
    });
  });

  it('should return closed orders', (done) => {
    client.closedOrders().then(function(resp) {
      assert(resp.result);
      // console.log(JSON.stringify(resp));
      assert(resp.result.closed);
      done();
    }).catch(err => {
      assert.fail(err);
    });
  });

  it('should return trade history', (done) => {
    client.tradesHistory().then(function(resp) {
      // console.log(JSON.stringify(resp));
      assert(resp.result);
      let result = resp.result;
      assert.equal(Object.keys(result.trades).length, result.count);
      done();
    }).catch(err => {
      assert.fail(err);
    });
  });

  it('should return trade history with filter', (done) => {
    client.tradesHistory({trades: true}).then(function(resp) {
      // console.log(JSON.stringify(resp));
      assert(resp.result);
      let result = resp.result;
      assert.equal(Object.keys(result.trades).length, result.count);
      done();
    }).catch(err => {
      assert.fail(err);
    });
  });


  let ledgerId = '';
  it('should return ledgers info', (done) => {
    client.ledgers().then(function(resp) {
      // console.log(JSON.stringify(resp));
      assert(resp.result);
      let result = resp.result;
      assert(result.ledger);
      ledgerId = Object.keys(result.ledger)[0];
      done();
    }).catch(err => {
      assert.fail(err);
    });
  });

  it('should query ledgers', (done) => {
    client.queryLedgers({id : ledgerId}).then(function(resp) {
      // console.log(JSON.stringify(resp));
      assert(resp.result);
      let result = resp.result;
      assert(result[ledgerId]);
      done();
    }).catch(err => {
      assert.fail(err);
    });
  });

  it('should return trade volume', (done) => {
    client.tradeVolume({ 'pair': 'ETHUSDT' }).then(function(resp) {
      // console.log(JSON.stringify(resp));
      assert(resp.result);
      assert.equal(resp.result.currency, 'ZUSD');
      done();
    }).catch(err => {
      assert.fail(err);
    });
  });

});
