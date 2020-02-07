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

});
