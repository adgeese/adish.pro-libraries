const assert = require('assert');

// Define the application name during log testing
process.env.APPLICATION = 'Mocha Test';

var logging = logging = require('../lib/logging');

describe('Logging Tests Development', () => {
    context('Information and Error', () => {
        afterEach(()=> {
            logging = require('../lib/logging');
        });
        it('Log a message without formating', ()=>{
            logging.log('Test Log Message');
        });
        it('Log an APU message without formating', ()=>{
            logging.api('Test API Log Message');
        });
        it ('log an info message', () => {
            logging.info('info log message');
        });
        it ('log an error message', () => {
            logging.error('Error log message');
        });
	    it ('log a message with ansi colors', () => {
            logging.log('Color - Red'.red);
            logging.log('Color - Yellow'.yellow);
        });
	    it ('log an error with ansi messages', () => {
            logging.error('Error Color - Blue'.blue);
        });
	    it ('show detailed log message', () => {
            logging.log({JSON: true});
        });
        it ('Run a production information log', () => {
            process.env.NODE_ENV = 'PRODUCTION';
            logging = require('../lib/logging');
            process.env.NODE_ENV = 'DEVELOPMENT';
            logging.api('Silent Production API Logging');
        });
        it ('Run a production information log', () => {
            process.env.NODE_ENV = 'PRODUCTION';
            logging = require('../lib/logging');
            process.env.NODE_ENV = 'DEVELOPMENT';
            logging.log('Silent Production Logging');
            logging = require('../lib/logging');
        });
        it ('Run a production information log', () => {
            process.env.NODE_ENV = 'PRODUCTION';
            logging = require('../lib/logging');
            process.env.NODE_ENV = 'DEVELOPMENT';
            logging.log('Silent Production INFO Logging');
        });
    });
});


