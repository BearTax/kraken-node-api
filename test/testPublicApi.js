const kraken = require('..');
const Client = kraken.Client;
const assert = require('assert');

const API_KEY = '<API-Key>';
const API_SECRET = '<API-Sign>';

describe('Public API', () => {
  const client = new Client(API_KEY, API_SECRET);
  it('should return server time', (done) => {
    client.time().then(function(resp) {
      assert(resp.result);
      let result = resp.result;
      assert(result.unixtime);
      assert(result.rfc1123);
      done();
    }).catch(err => {
      assert.fail(err);
    });
  });


  it('should return all asset info', (done) => {
    client.assetInfo({}).then(function(resp) {
      assert(resp.result);
      let result = resp.result;
      assert(Object.keys(result).length > 0);
      done();
    }).catch(err => {
      assert.fail(err);
    });
  });

  it('should return `BCH` asset info', (done) => {
    client.assetInfo({asset: 'BCH'}).then(function(resp) {
      assert(resp.result);
      let result = resp.result;

      assert.equal(Object.keys(result).length, 1);
      assert.equal(Object.keys(result)[0], 'BCH');
      done();
    }).catch(err => {
      assert.fail(err);
    });
  });

  it('should return tradable asset pairs', (done) => {
    client.assetPairs().then(function(resp) {
      assert(resp.result);
      let result = resp.result;
      assert(result);
      done();
    }).catch(err => {
      assert.fail(err);
    });
  });

  it('should return tradable asset pairs with filters', (done) => {
    let params = {
      info: 'margin',
      pair: 'ETHUSDT'
    };
    client.assetPairs(params).then(function(resp) {
      assert(resp.result);
      let result = resp.result;
      // console.log(JSON.stringify(result));
      assert(result);
      assert.equal(Object.keys(result).length, 1);
      assert(result['ETHUSDT']);
      done();
    }).catch(err => {
      assert.fail(err);
    });
  });

  it('should return `ETHUSDT` ticker info', (done) => {
    client.ticker({pair : 'ETHUSDT'}).then(function(resp) {
      // console.log(JSON.stringify(resp));
      assert(resp.result);
      let result = resp.result;
      assert(result);
      done();
    }).catch(err => {
      assert.fail(err);
    });
  });

  it('should return ohlc data for `ETHUSDT`', (done) => {
    let params = {
      pair: 'ETHUSDT'
    };
    client.ohlc(params).then(function(resp) {
      assert(resp.result);
      let result = resp.result;
      // console.log(JSON.stringify(result));
      assert(result);
      assert(result['ETHUSDT']);
      done();
    }).catch(err => {
      assert.fail(err);
    });
  });

  it('should return order book(depth) for `ETHUSDT`', (done) => {
    let params = {
      pair: 'ETHUSDT'
    };
    client.depth(params).then(function(resp) {
      assert(resp.result);
      let result = resp.result;
      // console.log(JSON.stringify(result));
      assert(result);
      assert.equal(Object.keys(result).length, 1);
      assert(result['ETHUSDT']);
      done();
    }).catch(err => {
      assert.fail(err);
    });
  });
});
