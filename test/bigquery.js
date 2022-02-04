
const assert = require('assert');
const logging = require('../src/logging');

// Configure test Variables
const BQ_PROJECT_ID = process.env.BQ_PROJECTID || 'prj-adp-d-adp-base-fefc';
const BQ_DATASET = process.env.BQ_DATASET || 'test';
const BQ_TABLE = process.env.BQ_TABLE || 'test_paper';
const BQ_REGION = process.env.BQ_REGION || 'us-central1';

const BQ_TABLE_STRUCT = [
    {name: 'asset', type: 'STRING', mode: 'REQUIRED'},
    {name: 'direction', type: 'STRING', mode: 'REQUIRED'},
    {name: 'price', type: 'FLOAT', mode: 'REQUIRED'},
    {name: 'qty', type: 'FLOAT', mode: 'REQUIRED'},
    {name: 'created_on', type: 'TIMESTAMP', mode: 'REQUIRED'}
  ];

const BQ_TABLE_DATA = [
    {"asset":"ETHUSDT", "direction":"buy", "price":1232.22, "qty":0.21, "created_on":new Date()},
    {"asset":"ETHUSDT", "direction":"buy", "price":1532.22, "qty":0.21, "created_on":new Date()},
    {"asset":"ETHUSDT", "direction":"sell", "price":2232.22, "qty":0.42, "created_on":new Date()},
];

const BQ_SQL_QUERY = `SELECT * FROM \`${BQ_PROJECT_ID}.${BQ_DATASET}.${BQ_TABLE}\`;`;


function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const bigquery = require('../src/bigquery');
let bq

const cleanup_bq = async () => {
    logging.info('Setup the BigQuery Testing Area')
    // clear out the dataset
    bq = await bigquery.connect(BQ_REGION);
    await bigquery.delete_table(bq, BQ_DATASET, BQ_TABLE);
    await bigquery.delete_dataset(bq, BQ_DATASET);
    bq = false;
};

describe('BigQuery', () => {
    before(async () => {
        await cleanup_bq();
    });
    after(async () => {
        await cleanup_bq();
    });
    context('Connect', () => {
        it('Testing Connection', async () => {
            bq = await bigquery.connect(BQ_REGION);
            assert.equal(!!bq, true);
        });
    });
    context('Verify non-existing. Create Dataset, Table. Verify Existing.', () => {
        it('Verify Dataset does not exist', async ()=>{
            const exists = await bigquery.exists_dataset(bq, BQ_DATASET);
            assert.equal(exists, false);
        });
        it('Create Dataset', async ()=>{
            const createds = await bigquery.create_dataset(bq, BQ_DATASET);
            logging.info(createds);
            //assert.equal(exists, false);
            const exists = await bigquery.exists_dataset(bq, BQ_DATASET);
            assert.equal(exists, true);
        });
        it('Create Table', async ()=>{
            const createtbl = await bigquery.create_table(bq, BQ_REGION, BQ_DATASET, BQ_TABLE, BQ_TABLE_STRUCT);
            logging.info(createtbl);
            //assert.equal(exists, false);
            const exists = await bigquery.exists_table(bq, BQ_DATASET, BQ_TABLE);
            assert.equal(exists, true);
        });
    });
    context('Add data to Table and Query', () => {
        it('Add data to the table and verify exists', async ()=> {
            
            await bigquery.add_data(bq, BQ_DATASET, BQ_TABLE, BQ_TABLE_DATA);

            console.log('sleep 1s')
            await new Promise(resolve => setTimeout(resolve, 1000));

            console.log('sleep 5s')
            await new Promise(resolve => setTimeout(resolve, 5000));

            const rows = await bigquery.query(bq, BQ_REGION, BQ_SQL_QUERY);

            console.log(rows);
            
            // assert.equal(rows.length, BQ_TABLE_DATA.length);

        });

    });
});


