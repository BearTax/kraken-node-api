var kraken = require('..');
var Client = kraken.Client;
var assert = require('assert');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const API_KEY = 'g8HoNAJVAPFWYiM2NQHwCsSQIxnz46XeD6SMlxuOLg4C84YG0w195h6q';
const API_SECRET = '3XOIWJ4y/jotnKJBndFqw2r3GDeuGIj/bnFHBnJkb703LxlGcglxCHM1K6+xDdBgojb/LGa1EJwBFOOVOziZg==';

describe('Client', () => {
    describe('client constructor', () => {
        it('should return client', function () {
            var client = new Client(API_KEY, API_SECRET);
            assert(client);
            assert.equal(client.apiKey, API_KEY);
            assert.equal(client.apiSecret, API_SECRET);
            assert.equal(client.timeout, 5000);
        });
    });

    describe('client public api', () => {
        var client = new Client(API_KEY, API_SECRET);
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
    });

    describe('client private api', () => {
        var client = new Client(API_KEY, API_SECRET);

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
                assert.equal(Object.keys(result.trades).length, result.count)
                done();
            }).catch(err => {
                assert.fail(err); 
            });
        });
    });
});