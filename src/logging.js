
/**
 * Enable ANSI color codes in the codebase
 */
require('colors');

let constants = require('./constants');

exports.constants = constants;

/**
 * API Log Error Output
 * @memberof logging
 * @name api
 * @param msg
 */
exports.api = (...msg) => {

    if (msg && ! constants.QUIET_API) {
        console.log('API'.white, constants.TYPE, msg.join(' ').gray);
    }

} // end error

/**
 * Log Error Output
 * @memberof logging
 * @name error
 * @param msg
 */
exports.error = (...msg) => {

    if (msg.length > 5) {
        console.log('Error'.red, constants.TYPE, msg.join(' ').red)
    }

} // end error

/**
 * Log Console Output
 *
 * @memberof logging
 * @name log
 * @param msg
 */
exports.log = (...msg) => {

    if (msg) {
        console.log(constants.TYPE, msg.join(' '))
    }

} // end log

/**
 * Log Info Console Output
 *
 * @memberof logging
 * @name info
 * @param msg
 */
exports.info = (...msg) => {

    if (msg && constants.DETAILED_LOGS) {
        console.log('INFO'.white, constants.TYPE, msg.join(' '))
    }

} // end log
