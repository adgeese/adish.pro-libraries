var assert = require('assert');

process.env.NODE_ENV = 'TESTING';
process.env.ASSET = 'bybit.ETH-USDT';

var constants = require('../src/constants');

console.log('Constants', constants)

describe('Testing Constants', () => {
    context('Detailed Logs', () => {
        it('testing environment enabled', ()=>{
            assert.equal(constants.NODE_ENV, 'TESTING');
        });
        it('Detailed logs enabled', ()=>{
            assert.equal(constants.DETAILED_LOGS, true);
        });
        it('Detailed logs disabled', ()=>{
            constants.DETAILED_LOGS = false;
            assert.equal(constants.DETAILED_LOGS, false);
            constants.DETAILED_LOGS = true;
        });
    });
    context('Exchange', () => {
        it('Asset is set correctly', () => {
            assert.equal(constants.ASSET, 'bybit.ETH-USDT');
        });
        it('Test it Exchange Constant', () => {
            assert.equal(constants.EXCHANGE, 'BYBIT');
        });
    });
});


