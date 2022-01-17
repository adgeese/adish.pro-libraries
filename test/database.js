var assert = require('assert');

process.env.NODE_ENV = 'TESTING';
process.env.ASSET = 'bybit.ETH-USDT';

var database = require('../src/database');

describe('Testing Database', () => {
    context('Connect to Localhost', () => {
        it('Connect', async () => {
            const message = 'Hello world!';
            const messageCompare = await database.query('SELECT $1::text as message', [message]);
            // console.log(messageCompare);
            // process.exit(1);
            assert.equal(message, messageCompare.rows[0].message);
        });
        it('Test it Exchange Constant', () => {
            assert.equal(1, 1);
        });

        after(async () => {
            await database.close();
        });
    });
});


