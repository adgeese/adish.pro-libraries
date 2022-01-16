

/**
 * Local values of the exchange names and their maximum fees.
 * Array = [name => maximum fee]
 **/
const EXCHANGE_FEE_OFFSET_DEFAULTS = {
    'GDAX': 0.5,   
    'BINANCE': 0.1,
    'BYBIT' : 0.07,
};

const EXCHANGE_MINMUM_ORDER_USD_DEFAULTS = {
    'GDAX': 15,   
    'BINANCE': 15,
    'BYBIT' : 15,
};

const asset = process.env.ASSET || 'UNKNOWN-ASSET';
let exchange = 'BYBIT';

// return the name that associates to the EXCHANGE_FEE_OFFSET_DEFAULT
for (exchange_name in EXCHANGE_FEE_OFFSET_DETAULTS) {
    if (asset.toUpperCase().indexOf(exchange_name) !== -1) {
        exchange = exchange_name;
        break;
    }
}; //end for

/**
 * Define the system constants and global constant variables
 *
 * @memberOf configuration
 * @param string NODE_ENV Defines the environment for the applications runtime [DEVELOPMENT, PRODUCTION, TESTING]
 */
module.exports = Object.assign({}, {
    
    NODE_ENV: process.env.NODE_ENV || 'DEVELOPMENT',
    DETAILED_LOGS: !!((process.env.NODE_ENV || '').toString().toLowerCase() !== 'production'),
    QUIET_API: process.env.QUIET_API || false,
    MAX_WAIT_QUOTE_TRADE: 60 * 120 * 1000,
    HOSTNAME: process.env.HOSTNAME || 'localhost',
    COLOR: process.env.COLOR || 'green',
    STARTTIME: Date.now(),
    APIURL: process.env.APIURL || `http://127.0.0.1:2345/api/v1`,
    APIPRICEURL: process.env.APIPRICEURL || `http://127.0.0.1:7426/api/v1`,
    TYPE: process.env.APPLICATION || 'bot',
    PGBOUNCER: process.env.PGBOUNCER || 'localhost',

    // Set the asset being run
    ASSET : asset,

    // Idetification Functions
    EXCHANGE : exchange,

    // hedge calculator constants
    HIGH_VOLUME_ENTRY_PERCENT:  0.00000000000001,
    DEFAULT_MAX_UP: 1,
    EXCHANGE_FEE_OFFSET_DEFAULT: EXCHANGE_FEE_OFFSET_DEFAULTS[exchange],
    EXCHANGE_MINMUM_ORDER_USD_DEFAULT: EXCHANGE_MINMUM_ORDER_USD_DEFAULTS[exchange],
    HEDGE_VERSION : 5.00,
    DEFAULT_ENTRY_PERCENT : 1,
    DEFAULT_KNIGHT : [3, 3, 5, 8],

// Global Variable Usage (temporary)
// ** balance { currenty, asset, currency_hold, asset_hold }
// ** email
// ** next_balance
// --- active_hedge {}
// --- last_hedge
// IN askprice
// ** pip_size
// ** estimated-balance-usd
// ** pip-lookup
// ** hedge-percent-overwrite
// ** volume
// + exchange-name
// + exchange-fee
// + minimum-order-size-'currency'
// + default-entry-percent
// ** disable-high-risk
// IN bidprice
// ** last_buy
// ** first_buy
// ** mean
// ** min-notional-multiplier
// ** disable-knight
// --- active_hedge_row
// 

});

// EOF
