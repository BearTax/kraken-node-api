const ClientBase = require('../lib/ClientBase');
const assert = require('assert');

describe('ClientBase', () => {

    describe('methods', () => {
        var base = new ClientBase('', '');
        it('should validate `private/TradesHistory` as private', () => {
            assert(base._isPrivatePath('private/TradesHistory'))
        });

        it('should throw error for `public` path', () => {
            assert.throws(function() { base._isPrivatePath('public') }, Error)
        });
    });

});