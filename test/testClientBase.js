const ClientBase = require('../lib/ClientBase');
const assert = require('assert');

describe('ClientBase', () => {

    describe('constructor', () => {
        it('should create client base', () => {
            var client = new ClientBase('g8HoNAJVAPFWYiM2NQHwCsSQIxnz46XeD6SMlxuOLg4C84YG0w195h6q', '3XOIWJ4y/jotnKJBndFqw2r3GDeumGIj/bnFHBnJkb703LxlGcglxCHM1K6+xDdBgojb/LGa1EJwBFOOVOziZg==');
            assert(client);
            assert.equal(client.apiKey, 'g8HoNAJVAPFWYiM2NQHwCsSQIxnz46XeD6SMlxuOLg4C84YG0w195h6q');
            assert.equal(client.apiSecret, '3XOIWJ4y/jotnKJBndFqw2r3GDeumGIj/bnFHBnJkb703LxlGcglxCHM1K6+xDdBgojb/LGa1EJwBFOOVOziZg==');
            assert.equal(client.timeout, 20000);
        });
    });

    describe('methods', () => {
        var base = new ClientBase('g8HoNAJVAPFWYiM2NQHwCsSQIxnz46XeD6SMlxuOLg4C84YG0w195h6q', '3XOIWJ4y/jotnKJBndFqw2r3GDeumGIj/bnFHBnJkb703LxlGcglxCHM1K6+xDdBgojb/LGa1EJwBFOOVOziZg==');
        it('should validate `private/TradesHistory` as private', () => {
            assert(base._isPrivatePath('private/TradesHistory'))
        });

        it('should throw error for `public` path', () => {
            assert.throws(function() { base._isPrivatePath('public') }, Error)
        });
    });

});