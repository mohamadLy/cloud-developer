const AWS = require('aws-sdk')
const axios = require('axios')

// Name of a service, any string
const serviceName = process.env.SERVICE_NAME
// URL of a service to test
const url = process.env.URL

// CloudWatch client
const cloudwatch = new AWS.CloudWatch();

exports.handler = async (event) => {
  // TODO: Use these variables to record metric values
  let endTime
  let requestWasSuccessful

  const startTime = timeInMs()
  try {
    response = await axios.get(url)
    if ( response.status == 200 )
      requestWasSuccessful = 'Yes'
    else 
      requestWasSuccessful = 'No'
  } catch (error) {
    console.error(error)
    requestWasSuccessful = 'No';
  } finally {
    endTime = timeInMs();
  }
  //await axios.get(url)

  // Example of how to write a single data point
   await cloudwatch.putMetricData({
     MetricData: [
       {
         MetricName: 'Latency', // Use different metric names for different values, e.g. 'Latency' and 'Successful'
         Dimensions: [
           {
             Name: 'ServiceName',
             Value: serviceName
           }
         ],
         Unit: 'Milliseconds', // 'Count' or 'Milliseconds'
         Value: endTime - startTime // Total value
       }
     ],
     Namespace: 'Udacity/Serveless'
   }).promise()

   await cloudwatch.putMetricData({
     MetricData: [
       {
         MetricName: 'Successful',
         Dimensions: [
           {
             Name: 'ServiceName',
             Value: serviceName
           }
         ],
         Unit: 'Count',
         Value: requestWasSuccessful
       }
     ],
     Namespace: 'Udacity/Serveless'
   }).promise()
}

function timeInMs() {
  return new Date().getTime()
}
