
const assert = require('assert');

// Configure test Variables
const BQ_PROJECT_ID = process.env.BQ_PROJECTID || 'prj-adp-d-adp-base-fefc';
const BQ_DATASET = process.env.BQ_DATASET || 'adish';
const BQ_TABLE = process.env.BQ_TABLE || 'ad_paper';
const BQ_REGION = process.env.BQ_REGION || 'us-central1';

const BQ_TABLE_STRUCT = [
    {name: 'asset', type: 'STRING', mode: 'REQUIRED'},
    {name: 'direction', type: 'STRING', mode: 'REQUIRED'},
    {name: 'price', type: 'FLOAT', mode: 'REQUIRED'},
    {name: 'qty', type: 'FLOAT', mode: 'REQUIRED'},
    {name: 'created_on', type: 'TIMESTAMP', mode: 'REQUIRED'}
  ];

const BQ_TABLE_DATA = [
    {"asset":"ETHUSDT", "direction":"buy", "price":1232.22, "qty":0.21, "created_on":"CURRENT_TIMESTAMP()" },
    {"asset":"ETHUSDT", "direction":"buy", "price":1532.22, "qty":0.21, "created_on":"CURRENT_TIMESTAMP()" },
    {"asset":"ETHUSDT", "direction":"sell", "price":2232.22, "qty":0.42, "created_on":"CURRENT_TIMESTAMP()" },
];

const BQ_SQL_QUERY = `SELECT \`direction\`, \`price\`, \`qty\` FROM \`${BQ_PROJECT_ID}.${BQ_DATASET}.${BQ_TABLE}\` WHERE \`asset\` = 'ETHUSDT' ORDER BY \`created_on\` ASC;`;

const constants = require('../src/bigquery');

describe('BigQuery', () => {
    before(() => {
        // clear out the dataset

    });
    context('Connect', () => {
        it('Testing Connection');
    });
    context('Verify non-existing. Create Dataset, Table. Verify Existing.', () => {
        it('Verify Dataset does not exist', ()=>{

        });
        it('Create Dataset')
    });
    context('Add data to Table and Query', () => {
        it('');
    });
    context('Delete Dataset, Table', () => {
        it('');
    });
    context('Disconnect', () => {
        it('Closing Connection');
    });
});


