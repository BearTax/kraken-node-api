var kraken = require('..');
var Client = kraken.Client;
var assert = require('assert');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

describe('Client', () => {
    describe('client constructor', () => {
        it('should return client', function () {
            var client = new Client('g8HoNAJVAPFWYiM2NQHwCsSQIxnz46XeD6SMlxuOLg4C84YG0w195h6q', '3XOIWJ4y/jotnKJBndFqw2r3GDeumGIj/bnFHBnJkb703LxlGcglxCHM1K6+xDdBgojb/LGa1EJwBFOOVOziZg==');
            assert(client);
            assert.equal(client.apiKey, 'g8HoNAJVAPFWYiM2NQHwCsSQIxnz46XeD6SMlxuOLg4C84YG0w195h6q');
            assert.equal(client.apiSecret, '3XOIWJ4y/jotnKJBndFqw2r3GDeumGIj/bnFHBnJkb703LxlGcglxCHM1K6+xDdBgojb/LGa1EJwBFOOVOziZg==');
            assert.equal(client.timeout, 20000);
        });
    });

    describe('client api', () => {
        var client = new Client('g8HoNAJVAPFWYiM2NQHwCsSQIxnz46XeD6SMlxuOLg4C84YG0w195h6q', '3XOIWJ4y/jotnKJBndFqw2r3GDeumGIj/bnFHBnJkb703LxlGcglxCHM1K6+xDdBgojb/LGa1EJwBFOOVOziZg==');
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
});