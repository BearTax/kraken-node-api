const kraken = require('..');
const Client = kraken.Client;
const assert = require('assert');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const API_KEY = '<API-Key>';
const API_SECRET = '<API-Sign>';

describe('Client', () => {
    describe('client constructor', () => {
        it('should return client', function () {
            const client = new Client(API_KEY, API_SECRET);
            assert(client);
            assert.equal(client.apiKey, API_KEY);
            assert.equal(client.apiSecret, API_SECRET);
            assert.equal(client.timeout, 5000);
        });
    });
});
