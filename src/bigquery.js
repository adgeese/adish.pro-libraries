
const logging = require('./logging');
const {BigQuery} = require('@google-cloud/bigquery');

/**
 * BigQuery High Level Integration
 * 
 * @export create_table
 * @export create_dataset
 * @export connect
 * @export delete_table
 * @export delete_dataset
 * @export exists_table
 * @export exists_dataset
 **/

/**
 * Check for an existing table and create if changes requird
 * 
 * @name create_table
 * @context bigquery
 * @param object BQ_CONN
 * @param string BQ_REGION
 * @param string BQ_DATASET
 * @param string BQ_TABLE
 * @param array BQ_TABLE_STRUCT
 * @return boolean
 **/
exports.create_table = async (BQ_CONN, BQ_REGION, BQ_DATASET, BQ_TABLE, BQ_TABLE_STRUCT) => {

  // For all options, see https://cloud.google.com/bigquery/docs/reference/v2/tables#resource
  const options = {
    schema: BQ_TABLE_STRUCT,
    location: BQ_REGION,
  };

  // Create a new table in the dataset
  const [table] = await BQ_CONN
    .dataset(BQ_DATASET)
    .createTable(BQ_TABLE, options)
    .catch((err) => {
      logging.error(err);
    });

  logging.info(`Table ${(table || {id:'error'}).id} created.`);

  return !!(table);

};


/**
 * Check for an existing table and create if changes requird
 * 
 * @name create_dataset
 * @context bigquery
 * @param object BQ_CONN
 * @param string BQ_DATASET
 * @return boolean
 **/
exports.create_dataset = async (BQ_CONN, BQ_DATASET) => {

  // Create the dataset
  const [dataset] = await BQ_CONN
    .createDataset(BQ_DATASET)
    .catch((err) => {
      logging.error(err);
    });


  logging.info(`Dataset ${(dataset || {id:'error'}).id} created.`);

  return dataset;
};



/**
 * Check for an existing table and create if changes requird
 * 
 * @name connect
 * @context bigquery
 * @param string BQ_REGION
 * @return boolean
 **/
exports.connect = async (BQ_REGION) => {

  const bigquery = new BigQuery({location : BQ_REGION});

  return bigquery;

};


/**
 * Check for an existing table and create if changes requird
 * 
 * @name delete_table
 * @context bigquery
 * @param object BQ_CONN
 * @param string BQ_DATASET
 * @param string BQ_TABLE
 * @return boolean
 **/
exports.delete_table = async (BQ_CONN, BQ_DATASET, BQ_TABLE) => {

  // Create a new table in the dataset
  await BQ_CONN
    .dataset(BQ_DATASET)
    .table(BQ_TABLE)
    .delete()
    .catch((err) => {
      logging.error(err);
    });

    logging.info(`Table ${(BQ_TABLE || 'error')} deleted.`);

};


/**
 * Check for an existing table and create if changes requird
 * 
 * @name delete_dataset
 * @context bigquery
 * @param string BQ_CONN
 * @param string BQ_DATASET
 * @return boolean
 **/
exports.delete_dataset = async (BQ_CONN, BQ_DATASET) => {

  // Create a new table in the dataset
  await BQ_CONN
    .dataset(BQ_DATASET)
    .delete()
    .catch((err) => {
      logging.error(err);
    });

    logging.info(`Dataset ${(BQ_DATASET || 'error')} deleted.`);

};


/**
 * Query BigQuery for data
 * 
 * @name query
 * @context bigquery
 * @param object BQ_CONN
 * @param string BQ_DATASET
 * @param string BQ_TABLE
 * @param array BQ_QUERY
 * @return array
 **/
exports.query = async (BQ_CONN, BQ_REGION, BQ_QUERY) => {

  // For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
  const options = {
    query: BQ_QUERY,
    // Location must match that of the dataset(s) referenced in the query.
    location: BQ_REGION,
  };

  // Run the query as a job
  const [job] = await BQ_CONN.createQueryJob(options);

  logging.info(`Job ${job.id} started.`);

  // Wait for the query to finish
  const [rows] = await job.getQueryResults();

  return rows;

};

/**
 * Check for an existing table and create if changes requird
 * 
 * @name add_data
 * @context bigquery
 * @param object BQ_CONN
 * @param string BQ_DATASET
 * @param string BQ_TABLE
 * @param array BQ_DATA
 * @return boolean
 **/
exports.add_data = async (BQ_CONN, BQ_DATASET, BQ_TABLE, BQ_DATA) => {

  try {
    
    // Insert data into a table
    await BQ_CONN
      .dataset(BQ_DATASET)
      .table(BQ_TABLE)
      .insert(BQ_DATA);
  } catch (err) {
    logging.error(err);
  }

  logging.info(`Inserted ${BQ_DATA.length} rows`);

  return true;

};

/**
 * Check for an existing table and create if changes requird
 * 
 * @name exists_table
 * @context bigquery
 * @param object BQ_CONN
 * @param string BQ_DATASET
 * @param string BQ_TABLE
 * @return boolean
 **/
exports.exists_table = async (BQ_CONN, BQ_DATASET, BQ_TABLE) => {

  // Retrieve table reference
  const dataset = BQ_CONN
    .dataset(BQ_DATASET);
  
  const [table] = await dataset
    .table(BQ_TABLE)
    .get()
    .catch(err => {
      logging.error(err);
    });

  logging.info(`${BQ_TABLE} ${!!((table ||{}).metadata) ? 'Found' : 'Not Found'}`);

  return !!((table ||{}).metadata);

};


/**
 * Check for an existing table and create if changes requird
 * 
 * @name exists_dataset
 * @context bigquery
 * @param object BQ_CONN
 * @param string BQ_DATASET
 * @return boolean
 **/
exports.exists_dataset = async (aBQ_CONN, BQ_DATASET) => {

  try {
    // check for existing dataset
    const [dataset] = await aBQ_CONN
      .dataset(BQ_DATASET)
      .get()
      .catch(err => {
        logging.error(err);
      });

    logging.info(`${BQ_DATASET} ${(dataset || false) ? 'Found' : 'Not found'}`);

    return !!(dataset || false);
  } catch (err) {
        logging.info(`${BQ_DATASET} ${(false) ? 'Found' : 'Not found'}`);

    return false;
  }
};

// eof
