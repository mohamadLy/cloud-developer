'use strict'

const AWS = require('aws-sdk')

const docClient = new AWS.DynamoDB.DocumentClient()

const groupsTable = process.env.GROUPS_TABLE

exports.handler = async (event) => {
  console.log('Processing event: ', event)

  // TODO: Read and parse "limit" and "nextKey" parameters from query parameters
  // let nextKey // Next key to continue scan operation if necessary
  // let limit // Maximum number of elements to return
  let limit
  let nextKey
  try {
    limit = getLimitParm(event)
    nextKey = getNextKey(event);
  } catch (e) {
    console.error(e)
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: ({
        error: 'Invalid url Parameter Provided!'
      })
    }
  }
  // HINT: You might find the following method useful to get an incoming parameter value
  // getQueryParameter(event, 'param')

  // TODO: Return 400 error if parameters are invalid

  // Scan operation parameters
  const scanParams = {
    TableName: groupsTable,
    // TODO: Set correct pagination parameters
     Limit: limit,
    ExclusiveStartKey: nextKey
  }
  console.log('Scan params: ', scanParams)

  const result = await docClient.scan(scanParams).promise()

  const items = result.Items

  console.log('Result: ', result)

  // Return result
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      items,
      // Encode the JSON object so a client can return it in a URL as is
      nextKey: encodeNextKey(result.LastEvaluatedKey)
    })
  }
}

/**
 * Get a query parameter or return "undefined"
 *
 * @param {Object} event HTTP event passed to a Lambda function
 * @param {string} name a name of a query parameter to return
 *
 * @returns {string} a value of a query parameter value or "undefined" if a parameter is not defined
 */
function getQueryParameter(event, name) {
  const queryParams = event.queryStringParameters
  if (!queryParams) {
    return undefined
  }

  return queryParams[name]
}

/**
 * Encode last evaluated key using
 *
 * @param {Object} lastEvaluatedKey a JS object that represents last evaluated key
 *
 * @return {string} URI encoded last evaluated key
 */
function encodeNextKey(lastEvaluatedKey) {
  if (!lastEvaluatedKey) {
    return null
  }

  return encodeURIComponent(JSON.stringify(lastEvaluatedKey))
}

/**
 * Retrieve the limit parameter from url
 * 
 * @param {Object} event HTTP event passed to a Lambda function
 * 
 * @returns {Integer} value of the limit parameter or throw exception if limit is negatif
 */
function getLimitParm( event ) {
  const limitParm = getQueryParameter(event, 'limit')
  let limit = 10
  // if we don't specify a limit use the default limit
  if ( limitParm ) {
    limit = parseInt(limitParm, 10)
    if ( limit < 0 ) 
      throw new Error('Limit must be a positive integer')
  } 
  return limit
}

/**
 * Retrieve the next parameter from url 
 * 
 * @param {Object} event HTTP event passed to a Lambda function
 * 
 * @returns {Integer} value of nextKey query parameter or "undefine" if a param
 */
function getNextKey( event ) {
  let nextKeyParm = getQueryParameter(event, 'nextKey')

  if ( nextKeyParm ) {
    nextKeyParm = JSON.parse(decodeURIComponent(nextKeyParm))
  }

  return nextKeyParm
}